import { Router } from "express";
import AdService from "../services/ad.service";
import { Ad, PartialAdWithoutId } from "../types/ads";

const router = Router();

router.get("/list", async (req, res) => {
  try {
    const adsList = await new AdService().listAds();
    res.send(adsList);
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
});

router.get("/find/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const ad = await new AdService().findAdById(id);
    res.send(ad);
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
});

//express validator
router.post("/create", async (req, res) => {
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
    const newAd = await new AdService().create(ad);
    res.status(201).send({ success: true, ad: newAd });
  } catch (err: any) {
    res.status(500).send({ success: false, errorMessage: err.message });
  }
});

router.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  // const { title, description, picture, location, price }: Partial<Ad>= req.body;
  const { title, description, picture, location, price }: PartialAdWithoutId =
    req.body;

  const ad = { title, description, picture, location, price };
  try {
    const adUpdate = await new AdService().update(id, ad);
    res.send(adUpdate);
  } catch (err: any) {
    console.log('%c⧭', 'color: #00a3cc', err);
    res.status(500).send({ success: false, errorMessage: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const adDelete = await new AdService().delete(id);

    res.send({ message: `L'annonce ${adDelete} a bien était supprimée` });
  } catch (error: any) {
    res.send({ error: "L'annonce n'a pas pu etre supprimée :" + error });
  }
});
export default router;
