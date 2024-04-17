class Recipe {
    constructor(json) {
      this.id = json.id || 0;
      this.title = json.title || '';
      this.imageUrl = Recipe.processApiImageUrl(json.image);
      this.imageType = json.imageType || '';
      this.nutrition = new Nutrition(json);
      this.extendedIngredients = (json.extendedIngredients || []).map(ingredient => new Ingredient(ingredient));
      this.instructions = json.instructions || '';
      this.readyInMinutes = json.readyInMinutes || 0;
      this.servings = json.servings || 0;
      this.sourceUrl = json.sourceUrl || '';
      this.spoonacularSourceUrl = json.spoonacularSourceUrl || '';
      this.weightWatcherSmartPoints = json.weightWatcherSmartPoints || 0;
      this.vegetarian = json.vegetarian || false;
      this.vegan = json.vegan || false;
      this.glutenFree = json.glutenFree || false;
      this.dairyFree = json.dairyFree || false;
      this.veryHealthy = json.veryHealthy || false;
      this.cheap = json.cheap || false;
      this.veryPopular = json.veryPopular || false;
      this.sustainable = json.sustainable || false;
      this.lowFodmap = json.lowFodmap || false;
      this.ketogenic = json.ketogenic || false;
      this.whole30 = json.whole30 || false;
      this.aggregateLikes = json.aggregateLikes || 0;
      this.creditText = json.creditText || '';
      this.sourceName = json.sourceName || '';
      this.isFavorite = json.isFavorite || false;
    }
  
    static processApiImageUrl(imageUrl) {
      if (imageUrl && (imageUrl.startsWith('http://') || imageUrl.startsWith('https://'))) {
        return imageUrl;
      } else {
        return `https://spoonacular.com/recipeImages/${imageUrl}`;
      }
    }
  }
  
  class Nutrition {
    constructor(json) {
      this.nutrients = (json.nutrients || []).map(nutrient => new Nutrient(nutrient));
    }
  }
  
  class Nutrient {
    constructor(json) {
      this.name = json.name;
      this.amount = parseFloat(json.amount) || 0;
      this.unit = json.unit;
    }
  }
  
  class Ingredient {
    constructor(json) {
      this.id = json.id || 0;
      this.aisle = json.aisle || '';
      this.image = json.image || '';
      this.name = json.name || '';
      this.amount = parseFloat(json.amount) || 0.0;
      this.unit = json.unit || '';
      this.unitShort = json.unitShort || '';
      this.unitLong = json.unitLong || '';
      this.originalString = json.original || 'Unknown Ingredient';
      this.metaInformation = json.metaInformation || [];
    }
  }
  