export const panelData = [
  { panelId: 9212, distance: 223, orientation: "PF" },
  { panelId: 8967, distance: 249, orientation: "TF" },
  { panelId: 9156, distance: 424, orientation: "TF" },
  { panelId: 9122, distance: 456, orientation: "TF" },
  { panelId: 10004, distance: 567, orientation: "PF" },
  { panelId: 9610, distance: 645, orientation: "TF" },
  { panelId: 9186, distance: 674, orientation: "PF" },
  { panelId: 10025, distance: 712, orientation: "PF" },
  { panelId: 10050, distance: 714, orientation: "PF" },
  { panelId: 9146, distance: 724, orientation: "TF" },
  { panelId: 10469, distance: 849, orientation: "TF" },
  { panelId: 8981, distance: 903, orientation: "TF" },
  { panelId: 10125, distance: 921, orientation: "PF" },
  { panelId: 9094, distance: 981, orientation: "TF" },
  { panelId: 10443, distance: 1045, orientation: "TF" },
  { panelId: 9162, distance: 1084, orientation: "PF" },
  { panelId: 9936, distance: 1124, orientation: "PF" },
  { panelId: 10479, distance: 1147, orientation: "TF" },
  { panelId: 9182, distance: 1176, orientation: "TF" },
  { panelId: 10460, distance: 1188, orientation: "PF" },
  { panelId: 9225, distance: 1226, orientation: "PF" },
  { panelId: 8949, distance: 1238, orientation: "TF" },
  { panelId: 8898, distance: 1249, orientation: "TF" },
  { panelId: 10468, distance: 1330, orientation: "PF" },
  { panelId: 9914, distance: 1497, orientation: "PF" },
  { panelId: 8887, distance: 1505, orientation: "TF" },
  { panelId: 10095, distance: 1569, orientation: "TF" },
  { panelId: 9889, distance: 1638, orientation: "PF" },
  { panelId: 9104, distance: 1666, orientation: "PF" },
  { panelId: 9544, distance: 1675, orientation: "PF" },
  { panelId: 9116, distance: 1708, orientation: "PF" },
  { panelId: 10088, distance: 1763, orientation: "TF" },
  { panelId: 9887, distance: 1778, orientation: "PF" },
  { panelId: 9130, distance: 1801, orientation: "TF" },
  { panelId: 9891, distance: 1844, orientation: "TF" },
  { panelId: 9958, distance: 1853, orientation: "PF" },
  { panelId: 10126, distance: 1881, orientation: "PF" },
  { panelId: 9924, distance: 1940, orientation: "PF" },
  { panelId: 10477, distance: 1980, orientation: "TF" },
  { panelId: 9160, distance: 1981, orientation: "TF" },
  { panelId: 10096, distance: 1992, orientation: "TF" },
  { panelId: 9979, distance: 1999, orientation: "TF" },
];
export const CharShowingTime = 0.035;
export const ApiCallInterval = 10; //second
export const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const monthShortName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const matchDataDefault = { month: 11, date: 29, hr: 18, front: "Wales", back: "Iran", min: 0 };
export const matchDataList = [
  { month: 11, date: 9, hr: 23, front: "Croatia", back: "Brazil", min: 0 },
  { month: 11, date: 11, hr: 3, front: "France", back: "England", min: 0 },
  { month: 11, date: 14, hr: 3, front: "Argentina", back: "Croatia", min: 0 },
  { month: 11, date: 15, hr: 3, front: "France", back: "Morocco", min: 0 },
  { month: 11, date: 17, hr: 23, front: "Croatia", back: "Morocco", min: 0 },
  { month: 11, date: 18, hr: 23, front: "Argentina", back: "France", min: 0 },
];
let panelId = [9212, 8967, 9156, 9122, 10004, 9610, 9186, 10025, 10050, 9146, 10469, 8981, 10125, 9094, 10443, 9162, 9936, 10479, 9182, 10460, 9225, 8949, 8898, 10468, 9914, 8887, 10095, 9889, 9104, 9544, 9116, 10088, 9887, 9130, 9891, 9958, 10126, 9924, 10477, 9160, 10096, 9979];
let distance = [223, 249, 424, 456, 567, 645, 674, 712, 714, 724, 849, 903, 921, 981, 1045, 1084, 1124, 1147, 1176, 1188, 1226, 1238, 1249, 1330, 1497, 1505, 1569, 1638, 1666, 1675, 1708, 1763, 1778, 1801, 1844, 1853, 1881, 1940, 1980, 1981, 1992, 1999];
let orientation = ["PF", "TF", "TF", "TF", "PF", "TF", "PF", "PF", "PF", "TF", "TF", "TF", "PF", "TF", "TF", "PF", "PF", "TF", "TF", "PF", "PF", "TF", "TF", "PF", "PF", "TF", "TF", "PF", "PF", "PF", "PF", "TF", "PF", "TF", "TF", "PF", "PF", "PF", "TF", "TF", "TF", "TF"];
