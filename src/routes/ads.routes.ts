import { Router } from "express";
import AdService from "../services/ad.service";
import { Ad } from "../types/ads";

const router = Router();

router.get("/list", (req, res) => {
  // router.get("/ads/list", (req, res) => {
  const adsList = new AdService().listAds();
  res.send(adsList);
});

router.get("/find/:id", (req, res) => {
  const { id } = req.params;
  try {
    const ad = new AdService().findAdById(id);
    res.send(ad);
  } catch (err: any) {
    res.status(404).send({ message: err.message });
  }
});

//express validator
router.post("/create", (req, res) => {
  const { id, title, description, picture, location, price }: Ad = req.body;

  const ad = {
    id,
    title,
    description,
    picture,
    location,
    price,
  };

  try {
    const newAd = new AdService().create(ad);
    res.status(201).send({ success: true, ad: newAd });
  } catch (err: any) {
    res.status(500).send({ success: false, errorMessage: err.message });
  }
});
export default router;
