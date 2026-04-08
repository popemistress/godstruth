#!/usr/bin/env python3
"""
pdf_to_images.py

Converts a PDF file into medium-resolution JPEG images (one per page).

Usage:
    python3 scripts/pdf_to_images.py path/to/file.pdf
    python3 scripts/pdf_to_images.py path/to/file.pdf --dpi 150 --out output_folder
"""

import argparse
import os
import sys
from pdf2image import convert_from_path

def main():
    parser = argparse.ArgumentParser(description="Convert a PDF to images (one per page).")
    parser.add_argument("pdf", help="Path to the PDF file")
    parser.add_argument("--dpi", type=int, default=150, help="Resolution (default: 150 dpi)")
    parser.add_argument("--out", default=None, help="Output folder (default: same folder as PDF)")
    parser.add_argument("--fmt", default="jpg", choices=["jpg", "png"], help="Image format (default: jpg)")
    args = parser.parse_args()

    if not os.path.isfile(args.pdf):
        print(f"Error: file not found: {args.pdf}", file=sys.stderr)
        sys.exit(1)

    base = os.path.splitext(os.path.basename(args.pdf))[0]
    out_dir = args.out or os.path.dirname(os.path.abspath(args.pdf))
    os.makedirs(out_dir, exist_ok=True)

    print(f"Converting '{args.pdf}' at {args.dpi} dpi → {out_dir}/")

    pages = convert_from_path(args.pdf, dpi=args.dpi)
    total = len(pages)

    for i, page in enumerate(pages, start=1):
        ext = "jpeg" if args.fmt == "jpg" else "png"
        filename = os.path.join(out_dir, f"{base}_page_{i:04d}.{args.fmt}")
        page.save(filename, ext.upper(), quality=85 if args.fmt == "jpg" else None)
        print(f"  [{i}/{total}] {os.path.basename(filename)}")

    print(f"\nDone — {total} image(s) saved to: {out_dir}")

if __name__ == "__main__":
    main()
