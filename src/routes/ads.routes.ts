import { Router } from "express";
import AdService from "../services/ad.service";
import { Ad, PartialAdWithoutId} from "../types/ads";

const router = Router();

router.get("/list", async (req, res) => {
  // router.get("/ads/list", (req, res) => {
  const adsList = await new AdService().listAds();
  res.send(adsList);
});

router.get("/find/:id", (req, res) => {
  const { id } = req.params;
  try {
    const ad = new AdService().findAdById(id);
    res.send(ad);
  } catch (err: any) {
    res.status(500).send({ message: err.message });
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


router.patch("/update/:id", (req, res) => {
  try {
    const { id } = req.params;
    // const { title, description, picture, location, price }: Partial<Ad>= req.body;
    const { title, description, picture, location, price }: PartialAdWithoutId = req.body;

    const ad = { title, description, picture, location, price };

    const adUpdate = new AdService().update(id, ad);

    res.send(adUpdate);
  } catch (error) {
    console.error(error);
    res.send({ error: "L'article n'as pas était trouvé" });
  }
});

router.delete("/delete/:id", (req, res) => {
  try {
    const { id } = req.params;
    const adDelete = new AdService().delete(id);

    res.send({ message: `L'annonce ${adDelete} as bien était supprimé` });
  } catch (error) {
    console.error(error);
    res.send({ error: "L'annonce n'as pas pu etre suprrimé" });
  }
});
export default router;
