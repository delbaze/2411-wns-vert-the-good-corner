import sqlite3 from "sqlite3";
import {
  Category,
  CategoryCreate,
  PartialCategoryWithoutId,
} from "../types/categories";

export default class CategoryService {
  db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database("the-good-corner.sqlite");
  }

  async listCategories() {
    return new Promise<Category[]>((resolve, reject) => {
      this.db.all<Category>("SELECT * FROM categories", (err, rows) => {
        if (err) {
          reject(err.message);
        }

        resolve(rows);
      });
    });
  }
  findCategoryById(id: string) {
    return new Promise<Category>((resolve, reject) => {
      this.db.get<Category>(
        "SELECT * FROM categories WHERE id = ?",
        [id],
        function (err: any, row) {
          if (err) {
            reject(err.message);
          }
          if (!row) {
            reject("La catégorie n'existe pas");
          }

          resolve(row);
        }
      );
    });
  }

  create(category: CategoryCreate<Category>) {
    return new Promise<Category>((resolve, reject) => {
      this.db.run(
        "INSERT INTO categories (title) VALUES (?)",
        [category.title],
        function (err: any) {
          if (err) {
            console.log("error", err);
            reject(err);
          } else {
            resolve({ ...category, id: `${this.lastID}` });
          }
        }
      );
    });
  }
  async update(id: string, category: Partial<PartialCategoryWithoutId>) {
    return new Promise<Category>(async (resolve, reject) => {
      try {
        const categoryFound = await this.findCategoryById(id);
        Object.keys(category).forEach((k) => {
          if (category[k]) {
            categoryFound[k] = category[k];
          }
        });
        this.db.run(
          "UPDATE categories SET title = ? WHERE id = ?",
          [categoryFound.title, id],
          function (err) {
            if (err) {
              reject("Il y a eu une erreur");
            }
            if (this.changes === 0) {
              reject("La catégorie n'existe pas");
            }

            resolve(categoryFound);
          }
        );
      } catch (err) {
        reject(err);
      }
    });
  }
  async delete(id: string) {
    return new Promise<string>((resolve, reject) => {
      this.db.run(
        "DELETE FROM categories WHERE id = ?",
        [id],
        function (error) {
          if (error) {
            reject(error);
          } else {
            if (this.changes === 0) {
              reject("La catégorie n'existe pas");
            }
            resolve(id);
          }
        }
      );
    });
  }
}
