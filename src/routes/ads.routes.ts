import { Router } from "express";
import { Ad } from "../types/ads";

const router = Router();

const adsList: Ad[] = [
  {
    id: "1",
    title: "Mon super titre 1",
    description: "Ma super description 1",
    price: 20.0,
    picture: "",
    location: "Paris",
  },
  {
    id: "2",
    title: "Mon super titre 2",
    description: "Ma super description 2",
    price: 30.0,
    picture: "",
    location: "Toulouse",
  },
];

router.get("/list", (req, res) => {
  // router.get("/ads/list", (req, res) => {
  res.send(adsList);
});

router.get("/find/:id", (req, res) => {
  // router.get("/ads/find/:id", (req, res) => {
  // http://localhost:4000/ads/find/123456789 // variable de chemin (path variable)
  //http://localhost:4000/ads/find?id=123456789 // query variable
});

export default router;
