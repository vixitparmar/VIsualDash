export interface DataItem {
    _id: string;
    end_year: string;
    intensity: number;
    sector: string;
    topic: string;
    insight: string;
    url: string;
    region: string;
    start_year: string;
    impact: string;
    added: string;
    published: string;
    country: string;
    relevance: number;
    pestle: string;
    source: string;
    title: string;
    likelihood: number;
    swot?: string; // Optional property
    city?: string;
}
