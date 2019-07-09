export interface GinModel {
  name: string;
  ginKey: string;
  status: string;
  description: string;
  content: string;
  degrees: string;
  taste: string;
  imageUrl: string;
  ingredients: string[];
  ginReviews?: GinReviewModel[];
  recipes?: RecipeModel[];
}

export interface GinReviewModel {
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
  username?: string;
  userId?: string;
  ingredients: string[];
  recipeReviews?: RecipeReviewModel[];
}

export interface RecipeReviewModel {
  userId?: string;
  username: string;
  reviewId: string;
  rating: number;
  review: string;
  datePosted: string;
}
