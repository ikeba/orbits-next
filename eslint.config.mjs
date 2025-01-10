import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Extending Next.js recommended ESLint configuration
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // WARNING: Disabling exhaustive-deps rule is not recommended
      // This rule helps prevent bugs related to missing dependencies in useEffect/useCallback
      // Consider fixing the dependency issues instead of disabling the rule
      "react-hooks/exhaustive-deps": "warn", // Changed to warning instead of off
      "react/display-name": "off",
    },
  },
];

export default eslintConfig;
