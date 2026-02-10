export interface Project {
  title: string;
  description: string;
  date: string;
  type: string;
}

export const projects: Project[] = [
  {
    title: "DK 61 Legionowo – Zegrze Południe",
    description:
      "Rozbudowa drogi krajowej nr 61 na odcinku Legionowo – Zegrze Południe. Zakres prac obejmował roboty ziemne, wykonanie warstw konstrukcyjnych nawierzchni oraz roboty brukarskie.",
    date: "2025 – obecnie",
    type: "Droga krajowa",
  },
  {
    title: "S61 Ostrów Mazowiecka – Śniadowo",
    description:
      "Budowa drogi ekspresowej S61 na odcinku Ostrów Mazowiecka – Śniadowo. Wykonanie podbudów i warstw konstrukcyjnych.",
    date: "2023 – 2024",
    type: "Droga ekspresowa",
  },
  {
    title: "S61 Śniadowo – Łomża",
    description:
      "Budowa drogi ekspresowej S61 na odcinku Śniadowo – Łomża Południe. Wykonanie umocnień stożków.",
    date: "2021 – 2022",
    type: "Droga ekspresowa",
  },
  {
    title: "S6 Bobrowniki – Skorowo",
    description:
      "Budowa drogi ekspresowej S6 na odcinku Bobrowniki – Skorowo. Kompleksowe roboty drogowe obejmujące nasypy, warstwy konstrukcyjne i organizację ruchu.",
    date: "2025 – 2026",
    type: "Droga ekspresowa",
  },
  {
    title: "Inwestycje na drogach gminnych",
    description:
      "Realizacja szeregu inwestycji na drogach gminnych, obejmujących budowę i przebudowę nawierzchni, chodników, zatok autobusowych oraz organizację ruchu.",
    date: "2019 – 2024",
    type: "Drogi gminne",
  },
];
