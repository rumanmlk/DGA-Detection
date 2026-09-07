Paste this as `README.md` in **DGA-Detection** (replace the current file).

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

The notebook also compares a heuristic reputation baseline (~0.65 accuracy) and other feature/model variants. The shipped inference path is **DeepD2V**.

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

Point the model paths in `Website/app.py` at this repo (`DeepD2V_model.h5`, `Word2Vec.kv`, `Data/count_1w.txt`), then:

```bash
cd Website
python app.py
```

```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d "{\"domain\": \"example.com\"}"
```

`predicted_class`: `0` = malware/DGA, `1` = benign.

## UI

```bash
cd Website/domain_name_model
npm install
npm start
```

The UI calls `http://localhost:5000/predict`. Keep Flask running.

## Retrain

Open the notebook, point the file paths at `Data/`, and run the DeepD2V section. Original training used Google Colab + Drive.

MIT.
