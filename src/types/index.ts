import type { Content, ContentType, Role, Plan, SubStatus } from "@prisma/client";

export type { Content, ContentType, Role, Plan, SubStatus };

export interface NavItem {
  label: string;
  href: string;
}

export interface ContentWithRelations extends Content {
  tags?: { tag: { id: string; name: string; slug: string } }[];
  series?: { id: string; title: string; slug: string } | null;
  book?: { id: string; name: string; slug: string; testament: string } | null;
}

export interface ContentFilters {
  type?: ContentType;
  search?: string;
  tags?: string[];
  bookSlug?: string;
  premium?: boolean;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  announcementBar: string | null;
  announcementUrl: string | null;
  maintenanceMode: boolean;
}

export interface AdminStats {
  totalUsers: number;
  totalContent: number;
  publishedContent: number;
  totalSubscriptions: number;
  monthlyRevenue: number;
}
