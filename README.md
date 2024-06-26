<div align="center">
    <h1>
        <a href="https://github.com/topstar210/Nervatrade-System.git">
            Nervatrade
        </a>
    </h1>
</div>

## App Structure
```
.
├── README.md            # README file
├── next.config.js       # Next JS configuration
├── public               # Public folder
├── app
│   ├── (auth)           # Organize routes without affecting the URL path
|   |   ├── login
|   |   ├── register
|   |   ├── global.css
|   |   ├── layout.tsx
|   |   └── loading.tsx
│   ├── api              # API handler
│   └── Provider.tsx     # NuxtAuth provider
├── components           # Page's components
├── context              # react context
├── models               # MongoDB schema
├── utilities            # Utility folder
├── tailwind.config.ts   # Tailwind CSS configuration
├── postcss.config.js    # Postcss configuration
├── eslintrc.json        # ESLint configuration
└── tsconfig.json        # TypeScript configuration
```