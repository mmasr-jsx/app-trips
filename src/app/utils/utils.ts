import { TripPayload } from '../models/trip.model';

export function getPagedQuery(query: string, page: number): string {
  return query.replace(/page=\d+/, `page=${page}`);
}

export function buildQuery(
  url: string,
  options: {
    by?: string;
    order?: string;
    title?: string;
    page?: number;
    limit?: number;
  } = {}
): string {
  const { by, order, title, page, limit } = options;
  return `${url}?${by ? 'sortBy=' + by + '&' : ''}${
    order ? 'sortOrder=' + order + '&' : ''
  }${title ? 'titleFilter=' + title + '&' : ''}${
    page ? 'page=' + page + '&' : 'page=1&'
  }${limit ? 'limit=' + limit + '&' : 'limit=12'}`;
}

export function getPayload(
  query: string,
  payload?: TripPayload[]
): TripPayload | null {
  return payload?.find((p) => p.query === query) || null;
}

export function getTotalPages(num: number, limit: number): number {
  return Math.ceil(num / limit);
}

export function removeWhiteSpace(text: string): string {
  return text.replace(/\s+/g, '');
}
