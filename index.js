"use strict";

const express = require("express");
const app = express();

// define endpoint for exercise 1 here
app.get("/math/circle/:r", (req, res) => {
  const r = parseFloat(req.params.r);

  if (isNaN(r) || r < 0) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const result = {
    area: (Math.PI * r * r).toFixed(2),
    circumference: (2 * Math.PI * r).toFixed(2),
  };
  res.json(result);
});

app.get("/math/rectangle/:width/:height", (req, res) => {
  const width = parseFloat(req.params.width);
  const height = parseFloat(req.params.height);

  if (isNaN(width) || isNaN(height) || width < 0 || height < 0) {
    return res.status(400).json({ error: "Invalid input" });
  }

  res.json({
    area: width * height,
    perimeter: 2 * (width * height),
  });
});

app.get("/math/power/:base/:exponent", (req, res) => {
  const base = parseFloat(req.params.base);
  const exponent = parseFloat(req.params.exponent);

  if (isNaN(base) || isNaN(exponent)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const response = { result: Math.pow(base, exponent) };

  if (req.query.root === "true") {
    response.root = Math.sqrt(base);
  }

  res.json(response);
});

app.get("/math/isprime/:n", (req, res) => {
  const n = Number(req.params.n);

  if (!Number.isInteger(n)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  let isPrime = n >= 2;
  for (let i = 2; i * i <= n && isPrime; i++) {
    if (n % i === 0) {
      isPrime = false;
    }
  }

  res.json({ number: n, isPrime });
});

app.get("/math/gcdlcm/:a/:b", (req, res) => {
  const a = Number(req.params.a);
  const b = Number(req.params.b);

  if (!Number.isInteger(a) || !Number.isInteger(b) || a < 1 || b < 1) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const gcd = (x, y) => (y === 0 ? x : gcd(y, x % y));

  const g = gcd(a, b);
  const lcm = (a * b) / g;

  res.json({ gcd: g, lcm });
});

app.get("/math/average", (req, res) => {
  const raw = req.query.nums;

  if (typeof raw != "string" || raw.trim() === "") {
    return res.status(400).json({ error: "Invalid input" });
  }

  const nums = raw.split(",").map(Number);

  if (nums.some((x) => !Number.isFinite(x) || x <= 0)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const n = nums.length;
  const round = (x) => Number(x.toFixed(2));

  const arytmetyczna = nums.reduce((sum, x) => sum + x, 0) / n;
  const geometryczna = Math.exp(
    nums.reduce((sum, x) => sum + Math.log(x), 0) / n,
  );
  const harmoniczna = n / nums.reduce((sum, x) => sum + 1 / x, 0);

  res.json({
    arytmetyczna: round(arytmetyczna),
    geometryczna: round(geometryczna),
    harmoniczna: round(harmoniczna),
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
