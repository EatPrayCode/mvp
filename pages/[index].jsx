import { useEffect, useState } from 'react';

import { DefaultLayout } from '../layouts';
import { getProductSlugs, getNeta } from '../lib/shopify';
import { useRouter } from 'next/router'

function PackPage({ productData, netaId }) {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const netaName = netaId;

  if (typeof window === 'undefined') {
    return <></>;
  } else {
    return (
      <>
        {domLoaded && (
          <DefaultLayout>
            <div role="main" className="flex flex-col items-center justify-center">
              <h1 className="text-4xl font-semibold leading-9 text-center text-gray-800 dark:text-gray-50">{netaName}</h1>
              <h1 className="text-base leading-normal text-center text-gray-600 dark:text-white mt-2 lg:w-1/2 md:w-10/12 w-11/12">Home Page of {netaName}</h1>
            </div>
          </DefaultLayout>
        )}
      </>
    );
  }
}

const checkIfExists = (id) => {
  return false;
};

export async function getStaticProps(context) {
  const productData = await getNeta(context.params);
  const netaId = context.params.index;
  // if (!checkIfExists(netaId)) {
  //   return { notFound: true };
  //   // this will display your /pages/404.js error page,
  //   // in the current page, with the 404 http status code.
  // }
  return {
    props: {
      productData,
      netaId: netaId
    },
  };
}

export async function getStaticPaths() {
  const productSlugs = await getProductSlugs();
  // const paths = productSlugs.map((slug) => {
  //   const product = String(slug.id);
  //   return {
  //     params: { product },
  //   };
  // });
  return {
    paths: [],
    fallback: 'blocking', //indicates the type of fallback
  };
}

export default PackPage;