// const admin = require('firebase-admin');
const functions = require(`firebase-functions`);
const serviceAccount = require(`./serviceAccountKey.json`);
import type { NextApiRequest, NextApiResponse } from 'next';

import admin from 'firebase-admin';
const syncDate = new Date().toISOString();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://devx-348322-default-rtdb.firebaseio.com/`,
});

const db = admin.firestore();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  // getFromAirtable(req, res);
  const collectionRef = db.collection(`netas`);

  const allResponse = collectionRef
    .get()
    .then((snapshot) => {
      const response: any = [];
      snapshot.forEach((doc) => {
        console.log(doc.id, `=>`, doc.data());
        const { name, netaId } = doc.data();
        const ele = {};
        response.push(ele);
      });
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(`Error getting documents`, err);
      res.status(500).json([]);
    });
}

const recordsList: { fields: any }[] = [];

async function getFromAirtable(req: any, res: any) {
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
        records.forEach(function (record: any) {
          recordsList.push(record);
        });

        fetchNextPage();
      },
      function done(err: any) {
        const minimalRecords = recordsList.map((ele: { fields: any }) => {
          return ele.fields;
        });
        uploadToFirebase(req, res, minimalRecords);
      },
    );
}

async function uploadToFirebase(req: any, res: any, data: any) {
  const entry = {
    status: 200,
    syncDate: new Date().toISOString(),
    data: data,
  };
}
