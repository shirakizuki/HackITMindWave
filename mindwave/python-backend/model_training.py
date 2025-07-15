import numpy as np
import pandas as pd
import tensorflow as tf
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, Conv1D, Flatten, Dense, LSTM, Concatenate, Reshape
from tensorflow.keras.utils import to_categorical

# Load preprocessed dataset from CSV
df_loaded = pd.read_csv("fatigueset_windows.csv")

# Separate features and labels
X_flat_loaded = df_loaded.drop("label", axis=1).values
y_loaded = df_loaded["label"].values

# Reshape data to (samples, 60, 6)
X_loaded = X_flat_loaded.reshape(-1, 60, 6)

# Split inputs into sensor modalities
acc_data = X_loaded[:, :, :3]   # Accelerometer (3)
bvp_data = X_loaded[:, :, 3:4]  # BVP (1)
eda_data = X_loaded[:, :, 4:5]  # EDA (1)
temp_data = X_loaded[:, :, 5:6] # Temp (1)

# One-hot encode labels
y_cat = to_categorical(y_loaded, num_classes=3)

# Split dataset into train/validation sets
X_train = [acc_data, bvp_data, eda_data, temp_data]
X_train_split = [d[:int(len(d)*0.8)] for d in X_train]
X_val_split = [d[int(len(d)*0.8):] for d in X_train]
y_train_split = y_cat[:int(len(y_cat)*0.8)]
y_val_split = y_cat[int(len(y_cat)*0.8):]

# Define CNN branch function
def cnn_branch(input_layer):
    x = Conv1D(32, kernel_size=3, activation='relu')(input_layer)
    x = Flatten()(x)
    return x
# Define input layers
acc_input = Input(shape=(60, 3), name="acc_input")
bvp_input = Input(shape=(60, 1), name="bvp_input")
eda_input = Input(shape=(60, 1), name="eda_input")
temp_input = Input(shape=(60, 1), name="temp_input")

# Create CNN branches for each modality
acc_branch = cnn_branch(acc_input)
bvp_branch = cnn_branch(bvp_input)
eda_branch = cnn_branch(eda_input)
temp_branch = cnn_branch(temp_input)

# Merge branches and add dense layers
merged = Concatenate()([acc_branch, bvp_branch, eda_branch, temp_branch])
x = Dense(128, activation='relu')(merged)
x = Dense(64, activation='relu')(x)
x = Reshape((1, 64))(x)
x = LSTM(64)(x)

# Output layer
output = Dense(3, activation='softmax')(x)
# Compile the model
model = Model(inputs=[acc_input, bvp_input, eda_input, temp_input], outputs=output)
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
# Train the model
history = model.fit(
    X_train_split,
    y_train_split,
    validation_data=(X_val_split, y_val_split),
    epochs=10,
    batch_size=32
)
# Save trained model
model.save('mfi_model.keras')