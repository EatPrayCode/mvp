// const admin = require('firebase-admin');
const functions = require(`firebase-functions`);
const serviceAccount = require(`./serviceAccountKey.json`);
import type { NextApiRequest, NextApiResponse } from 'next';

import admin from 'firebase-admin';

const syncDate = new Date().toISOString();

if (!admin.apps.length) {
  const firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://devx-348322-default-rtdb.firebaseio.com/`,
  });
}

const db = admin.firestore();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  getFromAirtable(req, res);
}

async function getFromAirtable(req: any, res: any) {
  const recordsList: any = [];
  const Airtable = require(`airtable`);
  const base = new Airtable({ apiKey: `key3ITRiEPhABhtTC` }).base(
    `appWvCVRmhAlOUo5T`,
  );
  base(`twitter-all`)
    .select({
      maxRecords: 100,
      view: `popular`,
    })
    .eachPage(
      function page(records: any[], fetchNextPage: () => void) {
        records.forEach(function (ele: any) {
          recordsList.push(ele.fields);
        });

        fetchNextPage();
      },
      function done(err: any) {
        uploadToFirebase(req, res, recordsList);
      },
    );
}

async function uploadToFirebase(req: any, res: any, data: any) {
  const netas = data.map((ele: any) => {
    const netaId = ele.twitterurl;
    const name = ele.name;
    const temp = {
      ...ele,
      id: netaId,
      title: name,
      slug: netaId,
      name: name,
    };
    return temp;
  });
  res.status(200).json(netas);
}
