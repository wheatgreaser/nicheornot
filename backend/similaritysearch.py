import pandas as pd
import numpy as np
from sentence_transformers import SentenceTransformer
from numpy.linalg import norm
import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

def compare_it(query):
    df = pd.read_csv('companies.csv')
    df_desc = df[['name','description']].dropna()
    df_desc =df_desc.reset_index(drop=True)
    embeddings = []
    for i in range(df_desc.shape[0]):
        embeddings.append(model.encode(df_desc.at[i,'description']))

    df_desc['embeddings'] = embeddings

    result = df_desc.to_json(orient="index")

    with open("sample.json", "w") as f:
        f.write(result)

    embed_query = model.encode(query)
    cosine = []
    for i in range(df_desc.shape[0]):
        cosine.append((np.dot(embed_query, embeddings[i]))/(norm(embeddings[i]) * norm(embed_query)))
    maxv = -1
    k = 0
    j = 0
    for i in cosine:
        if i > maxv:
            maxv = i
            k = j
        j+=1

    return [cosine[k], df_desc['name'].loc[k],df_desc['description'].loc[k]]
        
app = FastAPI()
origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class Item(BaseModel):
    name: str

@app.get("/")
async def root():
    return {"message": (compare_it("education")[1])}
    
@app.post("/company/")
async def create_item(item: Item):
    print(type(item.name))
    return {"name": (compare_it(item.name)[1]),
            "desc": (compare_it(item.name)[2]),
            "score": str((compare_it(item.name)[0]))}


