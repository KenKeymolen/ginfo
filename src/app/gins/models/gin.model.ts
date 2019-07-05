export interface GinModel {
  id: string;
  name: string;
  description: string;
  content: string;
  degrees: string;
  taste: string;
  ingredients: string[]
  reviews?: ReviewModel[];
  recipes?: RecipeModel[];
}

export interface ReviewModel {
  userId?: string;
  username: string;
  ginId: string;
  rating: number;
  review: string;
  datePosted: string;
}

export interface RecipeModel {
  name: string;
  description?: string;
  dateCreated: string;
  username: string;
  userId?: string;
  ingredients : string[];
  reviews?: ReviewModel[];
}
