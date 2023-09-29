const products = [
  {
    "_id": "64f1d5cc69d8333cf130fc22",
    "title": "Campari",
    "description": "A famous aperitif that is a bitter, red, herbal liqueur, well-known for its distinctive flavor and vibrant red color. Often used in cocktails.",
    "type": "Liqueur",
    "alcohol": "Yes",
    "abv": "24-28.5",
    "flavour": "Bitter and Herbal",
    "country": "Italy"
  },
   {
    "_id": "64f1d5cc69d8333cf130fc22",
    "title": "Campari",
    "description": "A famous aperitif that is a bitter, red, herbal liqueur, well-known for its distinctive flavor and vibrant red color. Often used in cocktails.",
    "type": "Liqueur",
    "alcohol": "Yes",
    "abv": "24-28.5",
    "flavour": "Bitter and Herbal",
    "country": "Italy"
    },
    {
    "_id": "64f1d5cc69d8333cf130fc22",
    "title": "Campari",
    "description": "A famous aperitif that is a bitter, red, herbal liqueur, well-known for its distinctive flavor and vibrant red color. Often used in cocktails.",
    "type": "Liqueur",
    "alcohol": "Yes",
    "abv": "24-28.5",
    "flavour": "Bitter and Herbal",
    "country": "Italy"
    },
     {
    "_id": "64f1d5cc69d8333cf130fc22",
    "title": "Campari",
    "description": "A famous aperitif that is a bitter, red, herbal liqueur, well-known for its distinctive flavor and vibrant red color. Often used in cocktails.",
    "type": "Liqueur",
    "alcohol": "Yes",
    "abv": "24-28.5",
    "flavour": "Bitter and Herbal",
    "country": "Italy"
  },
];


localStorage.setItem('products', JSON.stringify(products));

const data = JSON.parse(localStorage.getItem('products'));


// const data = localStorage.getItem('products');


