
---

### DGA-Detection — About
`DGA domain detection: Word2Vec + CNN (94% holdout), Flask API, React UI`

Topics: `dga` `cybersecurity` `keras` `word2vec` `flask` `react`

```markdown
# DGA Detection

Classify domain names as **DGA / malware** vs **benign**. Built during an ML internship (Ebryx): research notebook, saved models, Flask API, and a React UI.

## Result (DeepD2V)

| | |
| --- | --- |
| Data | 100k DGA + 100k Alexa-style benign domains (200k rows; ~89k unique DGA) |
| Split | 80/20, `random_state=42` (40k test) |
| Model | Domain → word tokens → Word2Vec (100-d) → TF-IDF-weighted stats → 1D CNN |
| Holdout accuracy | **0.94** (precision/recall/F1 0.94 macro) |

Notebook also compares a heuristic reputation baseline (~0.65 accuracy) and other feature/model variants. The shipped inference path is **DeepD2V**.

## Layout

| Path | Role |
| --- | --- |
| `DGA_Domain_Detection (1).ipynb` | EDA, training, evaluation (Colab) |
| `Data/` | DGA, Alexa/top-domain lists, word-frequency dictionary |
| `DeepD2V_model.h5` | Trained CNN |
| `Word2Vec.kv` | Trained embeddings |
| `Website/app.py` | Flask `POST /predict` |
| `Website/domain_name_model/` | React + Tailwind UI (`localhost:5000`) |

## API

```bash
# from Website/ — first point model paths at this repo
# DeepD2V_model.h5, Word2Vec.kv, Data/count_1w.txt
python app.py
