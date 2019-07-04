export interface GinModel {
  id: string;
  name: string;
  description: string;
  content: string;
  degrees: string;
  taste: string;
  ingredients: string[]
  reviews?: ReviewModel[];
}

export interface ReviewModel {
  userId: string;
  ginId?: string;
  review: string;
  datePosted: string;
}
