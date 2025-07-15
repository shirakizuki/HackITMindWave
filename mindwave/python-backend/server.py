from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
import tensorflow as tf

model = tf.keras.models.load_model("mfi_model.keras")

labels = ['Low', 'Medium', 'High']
class_weights = np.array([0, 50, 100])
class PredictionInput(BaseModel):
    data: list

app = FastAPI()
@app.post("/predict")
async def predict(input: PredictionInput):
    try:
        print("ASD")
        acc = np.expand_dims(np.array(input.data[0], dtype=np.float32), axis=0)
        bvp = np.expand_dims(np.array(input.data[1], dtype=np.float32), axis=0)
        eda = np.expand_dims(np.array(input.data[2], dtype=np.float32), axis=0)
        temp = np.expand_dims(np.array(input.data[3], dtype=np.float32), axis=0)

        probs = model.predict([acc, bvp, eda, temp], verbose=0)[0]

        prediction_index = int(np.argmax(probs))
        prediction_label = labels[prediction_index]

        fatigue_score = float(np.sum(probs * class_weights))

        return {
            "prediction": prediction_label,
            "probabilities": probs.tolist(),
            "fatigue_score": fatigue_score
        }
    except Exception as e:
        return {"error": str(e)}