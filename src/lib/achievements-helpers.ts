// // src/lib/achievements-helpers.ts
// import type { NavItem } from "@/data/mechanical/achievements";

// /** Find a content item by its key within the nested tree. */
// export function findItemByKey(
//   root: Record<string, NavItem>,
//   key: string
// ): NavItem | null {
//   for (const parentKey in root) {
//     const parentItem = root[parentKey];

//     // direct top-level (non-folder) match
//     if (parentKey === key && parentItem.contentType !== "folder") {
//       return parentItem;
//     }
//     // search sub-items
//     if ("subItems" in parentItem && parentItem.subItems) {
//       const sub = parentItem.subItems[key as keyof typeof parentItem.subItems];
//       if (sub) return sub as NavItem;
//     }
//   }
//   return null;
// }
