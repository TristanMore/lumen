export type BlockType = 'heading' | 'text' | 'fact' | 'diagram' | 'interactive' | 'chart';

export type ContentBlock = {
  id: string;
  question_id: string;
  block_order: number;
  block_type: BlockType;
  heading: string | null;
  body: string | null;
  config: { key: string } | null;
};

export type Question = {
  id: string;
  slug: string;
  question: string;
  category: string;
  read_time: string;
  tagline: string;
  intro: string;
  scene: string;
  gradient: string[];
  featured: boolean;
  sort_order: number;
  created_at: string;
};

export type RelatedQuestion = Question;

export type QuestionWithRelations = Question & {
  relations: RelatedQuestion[];
};

export type BlockConfig = { key: string };
