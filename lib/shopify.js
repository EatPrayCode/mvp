const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken =
  process.env.NEXT_PUBLIC_SHOPIFY_STORE_FRONT_ACCESS_TOKEN;
const collection = process.env.NEXT_PUBLIC_SHOPIFY_COLLECTION;

const fetchNetasUrl = `https://mrdemo.vercel.app/api/netas`;

export async function getAllProductsInCollection() {
  try {
    const data = await fetch(fetchNetasUrl).then((response) => response.json());
    return data;
  } catch (error) {
    throw new Error('Could not fetch products!');
  }
}

export async function getProductSlugs() {
  try {
    const data = await fetch(fetchNetasUrl).then((response) => response.json());
    return data;
  } catch (error) {
    throw new Error('Could not fetch product slugs!');
  }
}

export async function getNeta(params) {
  try {
    const netas = await fetch(fetchNetasUrl).then((response) =>
      response.json(),
    );
    const filteredNetas = netas.filter((ele) => {
      return ele.id == params.index;
    });
    return filteredNetas[0];
  } catch (error) {
    throw new Error('Could not fetch neta!');
  }
}

export async function getProduct(params) {
  try {
    const netas = await fetch(fetchNetasUrl).then((response) =>
      response.json(),
    );
    // const filteredNetas = netas.filter((ele) => {
    //   return ele.id == params.product;
    // });
    return netas[0];
  } catch (error) {
    throw new Error('Could not fetch product!');
  }
}
