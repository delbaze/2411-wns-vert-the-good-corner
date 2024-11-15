import { Category, PartialCategoryWithoutId } from "./../types/categories.d";
import { Router } from "express";
import CategoryService from "../services/category.service";

const router = Router();

router.get("/list", async (req, res) => {
  try {
    const categoriesList = await new CategoryService().listCategories();
    res.send(categoriesList);
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
});

router.get("/find/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const category = await new CategoryService().findCategoryById(id);
    res.send(category);
  } catch (err: any) {
    res.status(500).send({ message: err.message });
  }
});

//express validator
router.post("/create", async (req, res) => {
  const { id, title }: Category = req.body;

  const category = {
    id,
    title,
  };

  try {
    const newCategory = await new CategoryService().create(category);
    res.status(201).send({ success: true, category: newCategory });
  } catch (err: any) {
    res.status(500).send({ success: false, errorMessage: err.message });
  }
});

router.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { title }: PartialCategoryWithoutId = req.body;

  const category = { title };
  try {
    const categoryUpdate = await new CategoryService().update(id, category);
    res.send(categoryUpdate);
  } catch (err: any) {
    res.status(500).send({ success: false, errorMessage: err.message ?? err }); // opérateur de coalescence ?? ||
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const categoryDelete = await new CategoryService().delete(id);

    res.send({
      message: `La catégorie ${categoryDelete} a bien était supprimée`,
    });
  } catch (error: any) {
    res.send({ error: "La catégorie n'a pas pu etre supprimée : " + error });
  }
});
export default router;
