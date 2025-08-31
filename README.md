# Shortifyr - URL Shortener

Shortifyr is a simple and efficient URL shortener built with **Next.js** (frontend) and **Express.js** (backend).  
It allows users to shorten long URLs into neat, shareable links.

## 🚀 Features
- Shorten any long URL into a compact link  
- Redirect to the original URL using the shortened link  
- Backend powered by **Express.js** and **PostgreSQL**  
- Frontend powered by **Next.js** and **Tailwind CSS**  
- Easy deployment with **Vercel (frontend)** and **Render (backend)**

## 🛠️ Tech Stack
- **Frontend**: Next.js, Tailwind CSS  
- **Backend**: Node.js, Express.js, MongoDB  
- **Hosting**: Vercel (frontend), Render (backend)

## 📦 Setup & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/SpectureRam/shortifyr.git
cd shortifyr
```

### 2. Install Dependencies
```bash
npm i
```

### 3. Configure Environment Variables

#### Frontend (.env.local)
```
NEXT_PUBLIC_FRONTEND_URL=''
NEXT_PUBLIC_BACKEND_URL=''
```

### 4. Run the Project Locally

#### Frontend
```bash
npm run dev
```

## 🌐 Deployment
- **Frontend**: Deploy on [Vercel](https://vercel.com)  
- **Backend**: Deploy on [Render](https://render.com)

## 📸 Demo
Live Demo: [Shortifyr](https://shortifyr.vercel.app)

## 📌Roadmap
✅ Basic URL shortening<br>
✅ Analytics (click counts, device info)<br>
🔲 Custom slugs<br>
🔲 User accounts & history<br>
🔲 QR code generator<br>

Example shortened link:  
```
https://shortifyr.vercel.app/lyxseo
```

## 🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## 📜 License
This project is licensed under the GPL-3.0 License.
