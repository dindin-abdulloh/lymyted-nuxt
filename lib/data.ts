type Price = {
  id: number
  label: string
  path: string
  value: string[]
}

export const prices: Price[] = [
  {
    id: 2,
    label: "€5 - €15",
    path: "/?filter=price[5,15]",
    value: ["5", "15"],
  },
  {
    id: 3,
    label: "€15 - €50",
    path: "/?filter=price[15,50]",
    value: ["15", "50"],
  },
  {
    id: 4,
    label: ">€50",
    path: "/?filter=price[50,10000]",
    value: ["50", "10000"],
  },
]

export const QUERY_GET_PRODUCT_BY_PRICES = `


query getProductsByPrices(
  $after: String
  $first: Int = 90
  $minPrice: Float
  $maxPrice: Float
) {
  products(
    first: $first
    after: $after
    where: {
      minPrice: $minPrice
      status: "publish"
      maxPrice: $maxPrice
      orderby: { field: PRICE, order: ASC }
    }
  ) {
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      name
      onSale
      slug
      type
      databaseId
      id
      averageRating
      reviewCount
      ...Terms
      ...ProductCategories
      ...SimpleProduct
      ...VariableProduct
    }
  }
}
fragment SimpleProduct on SimpleProduct {
  price
  rawPrice: price(format: RAW)
  slug
  date
  regularPrice
  rawRegularPrice: regularPrice(format: RAW)
  salePrice
  rawSalePrice: salePrice(format: RAW)
  stockStatus
  stockQuantity
  lowStockAmount
  averageRating
  weight
  length
  width
  height
  reviewCount
  image {
    sourceUrl
    cartSourceUrl: sourceUrl(size: THUMBNAIL)
    altText
    title
  }
  galleryImages {
    nodes {
      sourceUrl
      altText
      title
    }
  }
}
fragment Terms on Product {
  terms(first: 1000) {
    nodes {
      taxonomyName
      slug
    }
  }
}
fragment VariableProduct on VariableProduct {
  price
  rawPrice: price(format: RAW)
  slug
  date
  weight
  length
  width
  height
  image {
    sourceUrl
    cartSourceUrl: sourceUrl(size: THUMBNAIL)
    altText
    title
  }
  averageRating
  reviewCount
  regularPrice
  rawRegularPrice: regularPrice(format: RAW)
  salePrice
  rawSalePrice: salePrice(format: RAW)
  stockStatus
  totalSales
  stockQuantity
  lowStockAmount
  attributes {
    nodes {
      name
      options
      variation
      visible
    }
  }
  defaultAttributes {
    nodes {
      name
      attributeId
    }
  }
  variations(first: 999) {
    nodes {
      name
      databaseId
      price
      regularPrice
      salePrice
      slug
      stockQuantity
      stockStatus
      hasAttributes
      image {
        sourceUrl
        cartSourceUrl: sourceUrl(size: THUMBNAIL)
        altText
        title
        id
      }
      attributes {
        nodes {
          value
          name
        }
      }
    }
  }
  galleryImages {
    nodes {
      sourceUrl
      altText
      title
    }
  }
}
fragment ProductCategories on Product {
  productCategories {
    nodes {
      databaseId
      slug
      name
      count
    }
  }
}

`
