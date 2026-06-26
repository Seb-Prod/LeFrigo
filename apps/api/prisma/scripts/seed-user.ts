import { PrismaClient, UserRole, UserStatus } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// ── CONFIG ────────────────────────────────────────────────────

const DEFAULT_PASSWORD = "Password123!"; // mot de passe commun à tous les users seed
const SALT_ROUNDS = 10;

// ── DATA ──────────────────────────────────────────────────────

const users: {
  email: string;
  userName: string;
  password?: string; // override possible par user
  role?: UserRole;
}[] = [
  { email: "seb@lefrigo.fr",     userName: "Seb-Prod",   role: UserRole.ADMIN },
  { email: "alice@lefrigo.fr",   userName: "Alice"  },
  { email: "bob@lefrigo.fr",     userName: "Bob"    },
  { email: "charlie@lefrigo.fr", userName: "Charlie" },
  { email: "diana@lefrigo.fr",   userName: "Diana"  },
  { email: "ethan@lefrigo.fr",   userName: "Ethan"  },
  { email: "fanny@lefrigo.fr",   userName: "Fanny"  },
  { email: "georges@lefrigo.fr", userName: "Georges" },
];

// ── MAIN ──────────────────────────────────────────────────────

async function main() {
  console.log(`\n👤  Seed users — mot de passe par défaut : "${DEFAULT_PASSWORD}"\n`);

  for (const data of users) {
    const plain = data.password ?? DEFAULT_PASSWORD;
    const hashed = await bcrypt.hash(plain, SALT_ROUNDS);

    const user = await prisma.user.upsert({
      where: { email: data.email },
      update: {},
      create: {
        email: data.email,
        emailLower: data.email.toLowerCase(),
        userName: data.userName,
        password: hashed,
        role: data.role ?? UserRole.USER,
        // Bypass complet de la vérification email
        status: UserStatus.ACTIVE,
        emailVerified: true,
      },
    });

    const tag = user.role === UserRole.ADMIN ? " 👑 ADMIN" : "";
    console.log(`  ✅  ${user.userName.padEnd(12)} <${user.email}>${tag}`);
  }

  console.log(`\n🎉  ${users.length} utilisateurs créés (ou déjà existants ignorés).\n`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());