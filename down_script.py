#!/usr/bin/env python3
"""Download Google Drive folders with fault tolerance - skips files that fail."""
import sys, os
sys.path.insert(0, '/home/pope/.local/lib/python3.12/site-packages')
import gdown

BASE_DIR = "/home/pope/sites/godstruth/down"

FOLDERS = {
    "LeftClick's Website (take it!)": "1W4EymkajF7WFOcJz2pprqEDH4epMDe_Y",
    "Modal & Deployment": "14C2a62up8qjliOEkZlZVGuzpP3O-Ddwh",
    "Website Design General": "15KrQH16_xP94s9LVlUPSg5YtvSfvxjY2",
}

for folder_name, folder_id in FOLDERS.items():
    print(f"\n{'='*60}")
    print(f"Folder: {folder_name} ({folder_id})")
    print(f"{'='*60}")

    url = f"https://drive.google.com/drive/folders/{folder_id}"
    out_dir = os.path.join(BASE_DIR, folder_name)

    print("Getting file listing (this may take a while for large folders)...")
    files = gdown.download_folder(
        url=url,
        output=out_dir,
        skip_download=True,
        remaining_ok=True,
        quiet=False,
    )

    if not files:
        print(f"ERROR: Could not list files for {folder_name}")
        continue

    SKIP_DIRS = ('.venv', 'node_modules', '__pycache__', '.git')

    files = [f for f in files if not any(
        part in SKIP_DIRS for part in f.path.replace('\\', '/').split('/')
    )]

    print(f"\nFound {len(files)} files after filtering. Downloading...")
    ok, failed = 0, 0
    for f in files:
        local_path = f.local_path
        os.makedirs(os.path.dirname(local_path), exist_ok=True)
        if os.path.exists(local_path):
            print(f"  SKIP (exists): {f.path}")
            ok += 1
            continue
        try:
            result = gdown.download(
                url=f"https://drive.google.com/uc?id={f.id}",
                output=local_path,
                quiet=True,
            )
        except Exception as e:
            result = None
        if result:
            print(f"  OK: {f.path}")
            ok += 1
        else:
            print(f"  FAIL: {f.path} (id={f.id})")
            failed += 1

    print(f"\nDone: {ok} downloaded, {failed} failed")

print("\nAll folders processed.")
