export const productsClassification = [
  {
    id: 100,
    text: "[100,کالای دیجیتال]",
    children: [
      {
        id: 101,
        text: "[100-101,موبایل]",
        children: [
          {
            id: 1011,
            text: "اپل",
            isLeaf: true,
          },
          {
            id: 1012,
            text: "سامسونگ",
            isLeaf: true,
          },
          {
            id: 1013,
            text: "نوکیا",
            isLeaf: true,
          },
        ],
      },
      {
        id: 102,
        text: "تجهیزات موبایل",
        isLeaf: true,
      },
    ],
  },
  {
    id: 200,
    text: "کامپیوتر",
    children: [
      {
        id: 201,
        text: "لپ تاپ",
        isLeaf: true,
      },
      {
        id: 202,
        text: "مانیتور",
        isLeaf: true,
      },
    ],
  },
];
