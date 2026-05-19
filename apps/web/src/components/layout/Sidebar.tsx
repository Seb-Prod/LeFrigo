"use client";

export default function Sidebar() {
  return (
    <aside
      style={{
        width: 260,
        borderRight: "1px solid #eee",
        padding: 20,
      }}
    >
      <h2>LeFrigo</h2>

      <nav>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
          }}
        >
          <li>Dashboard</li>
          <li>Produits</li>
          <li>Courses</li>
          <li>Paramètres</li>
        </ul>
      </nav>
    </aside>
  );
}