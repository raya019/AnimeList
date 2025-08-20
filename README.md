
# 🔍 Preview

animeelistt.netlify.app

---


# 📋 Anime List

AnimeList is a simple web application for browsing and managing a list of anime. It fetches anime data from the **[Jikan API](https://jikan.moe/)**, which is an unofficial MyAnimeList API, to display information such as anime titles, genres, synopses, and images. This website is built with **Vuejs**, and **Tailwind**.





## 🚀 Installation

### 1️⃣ Using Docker

#### Clone Repository
```bash
https://github.com/raya019/AnimeList.git
cd your-project
```
#### Build Docker Image

```bash
docker build -t animelist .
```

#### Run Container
```bash
docker run -d -p 3000:3000 animelist
```

And the application will be accessible at: http://localhost:3000

#### 📄 Notes

- You can change the exposed port (3000) based on your preference by editing the -p parameter. example 5173:3000 and the application will be accessible at: http://localhost:5173

### 2️⃣ Run Locally

Clone the project

```bash
  git clone https://github.com/raya019/AnimeList.git

```

Go to the project directory

```bash
  cd your-project
```

**Install dependencies**

This project uses pnpm by default

```bash
  pnpm install
```
**Start the server**

```bash
pnpm run dev
```


    