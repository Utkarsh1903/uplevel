// ─── FRONTEND & BACKEND ARTICLES ─────────────────────────────────────────────
// 500-800 words each · Markdown content · For Indian engineers switching to product companies

const ARTICLES_FE_BE = [
  // ─── FRONTEND ──────────────────────────────────────────────────────────────

  {
    slug: 'js-closures-scope',
    title: 'JavaScript Closures, Scope & Hoisting Explained',
    track: 'frontend',
    tags: ['javascript', 'closures', 'scope', 'hoisting'],
    readingTime: 7,
    content: `
## JavaScript Closures, Scope & Hoisting Explained

These three concepts come up in almost every frontend interview. If you've been writing JavaScript for years without thinking about them, this article will solidify your understanding fast.

---

## Lexical Scope and the Scope Chain

**Scope** determines where a variable is accessible. JavaScript uses **lexical scope** — scope is defined by where you write your code, not where you call it.

\`\`\`js
function outer() {
  const x = 10;

  function inner() {
    console.log(x); // 10 — inner can "see" outer's variables
  }

  inner();
}
\`\`\`

The **scope chain** is how JS looks up variables: it starts in the current scope and walks up to parent scopes until it finds the variable or reaches global scope.

---

## Closures

A **closure** is a function that remembers the variables from its surrounding scope, even after that outer function has returned.

\`\`\`js
function makeCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
\`\`\`

\`count\` is not garbage collected because the inner function holds a reference to it. This is the core of closures.

### Practical Use: Memoization

\`\`\`js
function memoize(fn) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache[key] !== undefined) return cache[key];
    cache[key] = fn(...args);
    return cache[key];
  };
}

const expensiveCalc = memoize((n) => {
  console.log('Computing...');
  return n * n;
});

expensiveCalc(5); // Computing... → 25
expensiveCalc(5); // 25 (cached)
\`\`\`

### Practical Use: Module Pattern

Before ES modules, closures were used to create private state:

\`\`\`js
const bankAccount = (function () {
  let balance = 0; // private

  return {
    deposit(amount) { balance += amount; },
    withdraw(amount) { balance -= amount; },
    getBalance() { return balance; },
  };
})();

bankAccount.deposit(100);
console.log(bankAccount.getBalance()); // 100
console.log(bankAccount.balance);       // undefined — private!
\`\`\`

---

## Hoisting

Hoisting is JavaScript's behavior of moving declarations to the top of their scope before execution. The key word is *declarations*, not *initializations*.

### var vs let vs const

\`\`\`js
console.log(a); // undefined (hoisted but not initialized)
var a = 5;

console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 10;
\`\`\`

- \`var\` is hoisted and initialized to \`undefined\`
- \`let\` and \`const\` are hoisted but NOT initialized — they sit in the **Temporal Dead Zone (TDZ)** until their declaration line

### Function Declarations vs Expressions

\`\`\`js
greet(); // "Hello" — works! Full function is hoisted

function greet() {
  console.log('Hello');
}

sayBye(); // TypeError: sayBye is not a function
var sayBye = function () {
  console.log('Bye');
};
\`\`\`

Function declarations are fully hoisted. Function expressions assigned to \`var\` are hoisted as \`undefined\`, so calling them throws.

---

## The Temporal Dead Zone (TDZ)

The TDZ is the time between the start of a block scope and the point where a \`let\` or \`const\` variable is declared. Accessing the variable in this zone throws a \`ReferenceError\`.

\`\`\`js
{
  // TDZ starts for 'x'
  console.log(x); // ReferenceError
  let x = 5;      // TDZ ends here
}
\`\`\`

This is actually a feature — it catches bugs from using variables before you mean to.

---

## Interview Cheat Sheet

| | var | let | const |
|---|---|---|---|
| Scope | Function | Block | Block |
| Hoisted | Yes (undefined) | Yes (TDZ) | Yes (TDZ) |
| Re-assignable | Yes | Yes | No |
| Re-declarable | Yes | No | No |

**Common gotcha in loops:**

\`\`\`js
// var — all callbacks share the same 'i'
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 3, 3, 3
}

// let — each iteration gets its own 'i'
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 0, 1, 2
}
\`\`\`

This is one of the most asked closure questions. The \`var\` version captures a reference to \`i\`, and by the time the callbacks fire, \`i\` is already 3. \`let\` creates a new binding per iteration.
    `.trim(),
  },

  {
    slug: 'js-async-await-event-loop',
    title: 'Promises, Async/Await & the JavaScript Event Loop',
    track: 'frontend',
    tags: ['javascript', 'async', 'promises', 'event-loop'],
    readingTime: 8,
    content: `
## Promises, Async/Await & the JavaScript Event Loop

JavaScript is single-threaded but handles async operations through the event loop. Understanding this model is essential for writing performant code and acing interviews.

---

## How the Event Loop Works

JavaScript has one call stack. Long-running operations (network requests, timers) are handed off to **Web APIs** (browser) or **libuv** (Node.js). When they complete, callbacks are queued.

There are two queues:
- **Microtask queue**: Promise callbacks (\`.then\`, \`.catch\`), \`queueMicrotask\`
- **Callback queue (macrotask)**: \`setTimeout\`, \`setInterval\`, I/O callbacks

**Order of execution:**
1. Run all synchronous code (call stack)
2. Drain the entire microtask queue
3. Pick ONE task from the callback queue
4. Repeat from step 2

\`\`\`js
console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => console.log('3'));

console.log('4');

// Output: 1, 4, 3, 2
\`\`\`

Step-by-step: sync logs 1 and 4 first. Then the microtask (Promise) runs before the macrotask (setTimeout).

---

## Promises

A Promise represents a value that will be available in the future. It has three states: pending, fulfilled, rejected.

\`\`\`js
const fetchUser = (id) =>
  new Promise((resolve, reject) => {
    if (id > 0) resolve({ id, name: 'Rahul' });
    else reject(new Error('Invalid ID'));
  });

fetchUser(1)
  .then((user) => console.log(user))
  .catch((err) => console.error(err))
  .finally(() => console.log('Done'));
\`\`\`

### Promise combinators

\`\`\`js
// All must succeed — fails fast on first rejection
const [user, posts] = await Promise.all([fetchUser(1), fetchPosts(1)]);

// First to settle (resolve or reject) wins
const fastest = await Promise.race([fetchFromPrimary(), fetchFromFallback()]);

// Wait for all, capture each result (no fail-fast)
const results = await Promise.allSettled([fetchA(), fetchB(), fetchC()]);
results.forEach(({ status, value, reason }) => {
  if (status === 'fulfilled') console.log(value);
  else console.error(reason);
});
\`\`\`

---

## Async/Await

Async/await is syntactic sugar over Promises. Every \`async\` function returns a Promise. \`await\` pauses execution of that function until the Promise settles.

\`\`\`js
async function loadDashboard(userId) {
  try {
    const user = await fetchUser(userId);
    const posts = await fetchPosts(userId); // sequential — waits for user first
    return { user, posts };
  } catch (err) {
    console.error('Dashboard load failed:', err);
    throw err; // re-throw so the caller knows
  }
}
\`\`\`

### Run in parallel with async/await

\`\`\`js
// WRONG — sequential (one waits for the other)
const user = await fetchUser(1);
const posts = await fetchPosts(1);

// RIGHT — parallel
const [user, posts] = await Promise.all([fetchUser(1), fetchPosts(1)]);
\`\`\`

---

## Common Gotchas

### await inside forEach does NOT work as expected

\`\`\`js
// BUG — forEach doesn't wait for async callbacks
const ids = [1, 2, 3];
ids.forEach(async (id) => {
  const user = await fetchUser(id); // fires but forEach doesn't await
  console.log(user);
});

// FIX — use for...of
for (const id of ids) {
  const user = await fetchUser(id);
  console.log(user);
}

// OR — parallel with map + Promise.all
const users = await Promise.all(ids.map((id) => fetchUser(id)));
\`\`\`

### Unhandled Promise rejections

\`\`\`js
// BAD — if this rejects, it's silent
fetchUser(1).then((user) => processUser(user));

// GOOD — always handle errors
fetchUser(1)
  .then((user) => processUser(user))
  .catch((err) => console.error(err));
\`\`\`

---

## Interview Summary

- Microtasks (Promises) always run before macrotasks (setTimeout)
- \`Promise.all\` fails fast; \`Promise.allSettled\` never fails
- \`async\` functions always return a Promise — even if you return a plain value
- Never use \`await\` inside \`forEach\` — use \`for...of\` or \`Promise.all\`
- Parallel async operations should use \`Promise.all\`, not sequential awaits
    `.trim(),
  },

  {
    slug: 'js-prototypal-inheritance',
    title: "Prototypal Inheritance & the 'this' Keyword in JavaScript",
    track: 'frontend',
    tags: ['javascript', 'prototype', 'this', 'inheritance'],
    readingTime: 7,
    content: `
## Prototypal Inheritance & the 'this' Keyword in JavaScript

These two topics trip up experienced engineers during interviews more than any other JavaScript concept. Here's everything you need to know.

---

## The Prototype Chain

Every JavaScript object has an internal \`[[Prototype]]\` link pointing to another object. When you access a property, JS looks on the object first, then walks up the chain until it finds it or hits \`null\`.

\`\`\`js
const animal = {
  breathe() { return 'breathing'; }
};

const dog = Object.create(animal); // dog's prototype is animal
dog.bark = function () { return 'woof'; };

console.log(dog.bark());    // 'woof' — own property
console.log(dog.breathe()); // 'breathing' — inherited from animal
console.log(dog.__proto__ === animal); // true
\`\`\`

### __proto__ vs prototype

- \`__proto__\` — instance property, the actual prototype link
- \`prototype\` — property on **constructor functions**, used to set up \`__proto__\` for instances

\`\`\`js
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  return \`Hi, I'm \${this.name}\`;
};

const p = new Person('Priya');
console.log(p.__proto__ === Person.prototype); // true
console.log(p.greet()); // "Hi, I'm Priya"
\`\`\`

### Class syntax is syntactic sugar

\`\`\`js
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return \`\${this.name} makes a sound\`;
  }
}

class Dog extends Animal {
  speak() {
    return \`\${this.name} barks\`;
  }
}

const d = new Dog('Rex');
console.log(d.speak()); // "Rex barks"
console.log(d instanceof Animal); // true — prototype chain
\`\`\`

Under the hood, \`extends\` sets up the prototype chain the same way \`Object.create\` does.

---

## The 'this' Keyword

\`this\` is determined by **how** a function is called, not where it's defined. This is the most common source of bugs.

### 1. Global context
\`\`\`js
console.log(this); // window (browser) or {} (Node module)
\`\`\`

### 2. Method call — this is the object before the dot
\`\`\`js
const obj = {
  name: 'Kiran',
  greet() { return this.name; }
};
console.log(obj.greet()); // 'Kiran'

// Detach the method and this breaks:
const fn = obj.greet;
console.log(fn()); // undefined (or error in strict mode)
\`\`\`

### 3. Arrow functions — this is lexically inherited
\`\`\`js
function Timer() {
  this.count = 0;

  // Regular function — loses 'this'
  setInterval(function () {
    this.count++; // 'this' is window/undefined
  }, 1000);

  // Arrow function — captures outer 'this'
  setInterval(() => {
    this.count++; // correct
  }, 1000);
}
\`\`\`

### 4. Event handlers
\`\`\`js
button.addEventListener('click', function () {
  console.log(this); // the button element
});

button.addEventListener('click', () => {
  console.log(this); // enclosing context (e.g. window), NOT the button
});
\`\`\`

### 5. Explicit binding: call, apply, bind

\`\`\`js
function greet(greeting) {
  return \`\${greeting}, \${this.name}\`;
}

const user = { name: 'Arjun' };

greet.call(user, 'Hello');         // "Hello, Arjun" — call with args spread
greet.apply(user, ['Namaste']);    // "Namaste, Arjun" — call with args array
const boundGreet = greet.bind(user);
boundGreet('Hey');                 // "Hey, Arjun" — returns new function
\`\`\`

---

## Interview Summary

| Context | Value of this |
|---|---|
| Global | window / global |
| Method call | The object (left of dot) |
| Arrow function | Enclosing lexical this |
| new keyword | The newly created instance |
| call/apply/bind | Whatever you pass in |

**The rule that simplifies everything:** Arrow functions don't have their own \`this\`. Regular functions get \`this\` based on how they're called.

**Common pitfall to mention in interviews:**

\`\`\`js
class Button {
  constructor(label) {
    this.label = label;
    // Without binding, 'this' is undefined inside click
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log(this.label);
  }
}
\`\`\`
    `.trim(),
  },

  {
    slug: 'es6-modern-javascript',
    title: 'ES6+ Features Every Frontend Engineer Must Know',
    track: 'frontend',
    tags: ['javascript', 'es6', 'modern-js', 'destructuring'],
    readingTime: 8,
    content: `
## ES6+ Features Every Frontend Engineer Must Know

ES6 (2015) and beyond transformed JavaScript. These features appear constantly in interviews and modern codebases. This is your complete reference.

---

## Destructuring

### Array Destructuring
\`\`\`js
const [first, second, ...rest] = [1, 2, 3, 4, 5];
// first=1, second=2, rest=[3,4,5]

// Skip elements
const [, , third] = [10, 20, 30]; // third=30

// Default values
const [a = 0, b = 0] = [5]; // a=5, b=0
\`\`\`

### Object Destructuring
\`\`\`js
const user = { name: 'Divya', age: 28, city: 'Pune' };

const { name, age } = user;

// Rename while destructuring
const { name: userName, city: location } = user;

// Nested + defaults
const { address: { pin = '000000' } = {} } = user;

// In function params
function greet({ name, age = 25 }) {
  return \`\${name} is \${age}\`;
}
\`\`\`

---

## Spread and Rest

\`\`\`js
// Spread — expand an iterable
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4]; // [1, 2, 3, 4]

const obj1 = { a: 1 };
const obj2 = { ...obj1, b: 2 }; // { a: 1, b: 2 }

// Shallow merge (last key wins)
const merged = { ...defaults, ...overrides };

// Rest — collect remaining into array
function sum(first, ...others) {
  return others.reduce((acc, n) => acc + n, first);
}
sum(1, 2, 3, 4); // 10
\`\`\`

---

## Template Literals

\`\`\`js
const name = 'Rohit';
const msg = \`Hello, \${name}! Today is \${new Date().toDateString()}\`;

// Multi-line
const html = \`
  <div class="card">
    <h2>\${name}</h2>
  </div>
\`;

// Tagged templates (used in styled-components, GraphQL)
const result = String.raw\`First line\\nSecond line\`; // \\n is literal
\`\`\`

---

## Optional Chaining (?.) and Nullish Coalescing (??)

\`\`\`js
// Optional chaining — short-circuits on null/undefined
const city = user?.address?.city; // undefined instead of throwing

// Works on method calls and array access
const len = user?.getName?.().length;
const first = arr?.[0];

// Nullish coalescing — only falls back on null/undefined (NOT 0 or "")
const port = config.port ?? 3000;    // 3000 only if port is null/undefined
const count = data.count || 10;      // WRONG: 0 would fall back to 10
const count2 = data.count ?? 10;     // CORRECT: 0 is kept as-is
\`\`\`

---

## Modules

\`\`\`js
// math.js
export const PI = 3.14;
export function add(a, b) { return a + b; }
export default function multiply(a, b) { return a * b; } // one per file

// main.js
import multiply, { add, PI } from './math.js'; // default + named
import * as math from './math.js';             // namespace import
import { add as sum } from './math.js';        // rename
\`\`\`

---

## Map and Set

\`\`\`js
// Map — any key type, ordered, iterable
const map = new Map();
map.set('name', 'Sneha');
map.set(42, 'answer');
map.get('name'); // 'Sneha'
map.has(42);     // true
map.size;        // 2

// Iterating
for (const [key, value] of map) { ... }

// Set — unique values only
const set = new Set([1, 2, 2, 3, 3]);
set.size; // 3

// Remove duplicates from array
const unique = [...new Set([1, 1, 2, 3, 3])]; // [1, 2, 3]
\`\`\`

---

## Symbol

\`\`\`js
// Guaranteed unique key — useful to avoid name collisions
const id = Symbol('id');
const user = { [id]: 123, name: 'Arun' };

user[id]; // 123
// id won't clash even if another lib adds a 'id' string key
\`\`\`

---

## Generators (Brief)

\`\`\`js
function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

const gen = range(1, 3);
gen.next(); // { value: 1, done: false }
gen.next(); // { value: 2, done: false }
gen.next(); // { value: 3, done: false }
gen.next(); // { value: undefined, done: true }

// Spread works on generators
console.log([...range(1, 5)]); // [1, 2, 3, 4, 5]
\`\`\`

Generators are lazy — they compute values on demand. They underpin libraries like Redux Saga.

---

## Quick Reference

| Feature | Use it for |
|---|---|
| Destructuring | Cleaner function params, API response unpacking |
| Spread | Immutable updates, shallow merging objects |
| Optional chaining | Safe property access on nullable data |
| Nullish coalescing | Default values that preserve 0 and "" |
| Map | Non-string keys, insertion order, frequent add/delete |
| Set | Uniqueness checks, deduplication |
    `.trim(),
  },

  {
    slug: 'dom-manipulation-guide',
    title: 'DOM Manipulation Without Frameworks',
    track: 'frontend',
    tags: ['javascript', 'dom', 'events', 'browser'],
    readingTime: 8,
    content: `
## DOM Manipulation Without Frameworks

Before React, there was the DOM API. Interviewers still ask about it, and understanding it makes you a better React developer too. Let's build a todo list from scratch.

---

## Selecting Elements

\`\`\`js
// Single element (returns null if not found)
const btn = document.querySelector('#submit-btn');
const heading = document.querySelector('.card h2');

// Multiple elements (returns NodeList)
const items = document.querySelectorAll('.todo-item');
items.forEach((item) => console.log(item.textContent));

// NodeList vs HTMLCollection
// NodeList: static snapshot, has forEach
// HTMLCollection: live, no forEach — convert with Array.from()
\`\`\`

---

## Event Listeners

\`\`\`js
const btn = document.querySelector('#btn');

function handleClick(event) {
  console.log(event.target);       // element that was clicked
  console.log(event.currentTarget); // element listener is on
  event.preventDefault();           // stop default browser behavior
  event.stopPropagation();          // stop bubbling
}

btn.addEventListener('click', handleClick);
btn.removeEventListener('click', handleClick); // must be same function reference
\`\`\`

---

## Event Bubbling, Capturing, and Delegation

Events bubble up from child to parent by default. **Event delegation** lets one listener handle many children:

\`\`\`js
// Instead of adding a listener to every list item:
const list = document.querySelector('#todo-list');

list.addEventListener('click', (e) => {
  // Check if a todo item (or its child) was clicked
  const item = e.target.closest('.todo-item');
  if (!item) return;

  item.classList.toggle('done');
});

// This works even for items added to the list AFTER the listener was set up
\`\`\`

Capturing phase: top → target. Bubbling: target → top. Pass \`{ capture: true }\` as third arg to listen during capture.

---

## Creating and Appending Elements

\`\`\`js
// Safe way — createElement
function createTodoItem(text) {
  const li = document.createElement('li');
  li.className = 'todo-item';

  const span = document.createElement('span');
  span.textContent = text; // textContent is XSS-safe

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.dataset.action = 'delete';

  li.appendChild(span);
  li.appendChild(deleteBtn);
  return li;
}

const list = document.querySelector('#todo-list');
list.appendChild(createTodoItem('Buy groceries'));
\`\`\`

### innerHTML vs createElement

\`\`\`js
// DANGEROUS if text comes from user input (XSS)
container.innerHTML = \`<p>\${userInput}</p>\`;

// SAFE
const p = document.createElement('p');
p.textContent = userInput; // escapes HTML entities
container.appendChild(p);
\`\`\`

---

## Data Attributes

\`\`\`js
// HTML: <button data-id="42" data-action="edit">Edit</button>
const btn = document.querySelector('button');
const id = btn.dataset.id;         // "42"
const action = btn.dataset.action; // "edit"

btn.dataset.status = 'active'; // sets data-status="active"
\`\`\`

---

## IntersectionObserver for Lazy Loading

\`\`\`js
const images = document.querySelectorAll('img[data-src]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const img = entry.target;
    img.src = img.dataset.src;
    img.removeAttribute('data-src');
    observer.unobserve(img); // stop watching once loaded
  });
}, { rootMargin: '200px' }); // load 200px before viewport

images.forEach((img) => observer.observe(img));
\`\`\`

---

## Mini Todo List — Putting It Together

\`\`\`js
const input = document.querySelector('#todo-input');
const addBtn = document.querySelector('#add-btn');
const list = document.querySelector('#todo-list');

function addTodo() {
  const text = input.value.trim();
  if (!text) return;

  const li = document.createElement('li');
  li.className = 'todo-item';
  li.textContent = text;
  li.dataset.id = Date.now();
  list.appendChild(li);
  input.value = '';
}

addBtn.addEventListener('click', addTodo);
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTodo();
});

// Event delegation for delete/complete
list.addEventListener('click', (e) => {
  const item = e.target.closest('.todo-item');
  if (!item) return;

  if (e.target.classList.contains('delete')) {
    item.remove();
  } else {
    item.classList.toggle('completed');
  }
});
\`\`\`

---

## Key Takeaways

- Use \`querySelector\` over \`getElementById\` — more flexible
- Always use event delegation for dynamic lists
- \`textContent\` over \`innerHTML\` for user-provided data
- \`IntersectionObserver\` is the modern way to do lazy loading and scroll effects
- \`dataset\` gives you a clean way to store metadata on elements
    `.trim(),
  },

  {
    slug: 'react-hooks-guide',
    title: 'React Hooks: A Complete Guide for Interview & Production',
    track: 'frontend',
    tags: ['react', 'hooks', 'useState', 'useEffect'],
    readingTime: 10,
    content: `
## React Hooks: A Complete Guide for Interview & Production

Hooks are the core of modern React. This guide covers the mental models and gotchas that interviewers test for.

---

## useState

\`\`\`js
const [count, setCount] = useState(0);

// Functional update — use when new state depends on old state
setCount((prev) => prev + 1);

// React 18+ batches multiple state updates inside event handlers
// Both setState calls cause only ONE re-render
function handleClick() {
  setCount((c) => c + 1);
  setFlag((f) => !f);
}
\`\`\`

**Lazy initialization** — pass a function to avoid expensive computation on every render:
\`\`\`js
const [data, setData] = useState(() => JSON.parse(localStorage.getItem('data') ?? 'null'));
\`\`\`

---

## useEffect

\`\`\`js
// Runs after every render (no deps array) — rarely what you want
useEffect(() => { ... });

// Runs only on mount
useEffect(() => { ... }, []);

// Runs when 'userId' changes
useEffect(() => {
  let cancelled = false;

  fetchUser(userId).then((user) => {
    if (!cancelled) setUser(user);
  });

  // Cleanup — runs before next effect and on unmount
  return () => { cancelled = true; };
}, [userId]);
\`\`\`

**Common mistakes:**
- Missing dependency → stale closure bugs (ESLint exhaustive-deps catches this)
- Infinite loop: setting state inside effect without conditions
- Not cleaning up subscriptions, timers, or event listeners

---

## useRef

Two uses: DOM refs and mutable values that don't trigger re-renders.

\`\`\`js
// DOM access
function TextInput() {
  const inputRef = useRef(null);

  return (
    <>
      <input ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Focus</button>
    </>
  );
}

// Mutable value — like an instance variable, no re-render on change
function Timer() {
  const intervalRef = useRef(null);

  function start() {
    intervalRef.current = setInterval(() => console.log('tick'), 1000);
  }

  function stop() {
    clearInterval(intervalRef.current);
  }

  return <><button onClick={start}>Start</button><button onClick={stop}>Stop</button></>;
}
\`\`\`

---

## useMemo and useCallback

Both are optimization hooks. Overusing them hurts readability without helping performance.

\`\`\`js
// useMemo — memoize a computed value
const sortedList = useMemo(
  () => [...items].sort((a, b) => a.name.localeCompare(b.name)),
  [items] // recompute only when items changes
);

// useCallback — memoize a function (avoids child re-renders)
const handleDelete = useCallback(
  (id) => setItems((prev) => prev.filter((item) => item.id !== id)),
  [] // stable reference
);
\`\`\`

**When to use:** Only when you can measure a performance problem, or when a function is a dependency of \`useEffect\` / passed to a \`React.memo\` child.

---

## useContext

\`\`\`js
// theme-context.js
const ThemeContext = createContext('light');

// Provider in a parent component
function App() {
  const [theme, setTheme] = useState('dark');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Dashboard />
    </ThemeContext.Provider>
  );
}

// Any child can consume without prop drilling
function Button() {
  const { theme } = useContext(ThemeContext);
  return <button className={theme}>Click me</button>;
}
\`\`\`

---

## Custom Hooks

Custom hooks let you extract and reuse stateful logic.

### useLocalStorage
\`\`\`js
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setStoredValue = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStoredValue];
}

// Usage
const [theme, setTheme] = useLocalStorage('theme', 'light');
\`\`\`

### useDebounce
\`\`\`js
function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer); // cleanup on each value change
  }, [value, delay]);

  return debounced;
}

// Usage — search input that waits for user to stop typing
function SearchBar() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    if (debouncedQuery) fetchResults(debouncedQuery);
  }, [debouncedQuery]);
}
\`\`\`

---

## Rules of Hooks (Know These Cold)

1. Only call hooks at the **top level** — never inside loops, conditions, or nested functions
2. Only call hooks from **React functions** — not regular JS functions

These rules ensure React can track hook call order between renders.
    `.trim(),
  },

  {
    slug: 'react-design-patterns',
    title: 'React Design Patterns: Compound Components, HOC, Render Props',
    track: 'frontend',
    tags: ['react', 'design-patterns', 'compound-components', 'hoc'],
    readingTime: 8,
    content: `
## React Design Patterns: Compound Components, HOC, Render Props

These patterns solve real problems with component composition and code reuse. Product companies expect senior engineers to know when and why to use them.

---

## Why Patterns Matter

As your app grows, you'll face two recurring problems:
1. **Logic reuse** — same behavior needed in multiple components
2. **API flexibility** — consumers need to control rendering without forking your component

These three patterns are the classic solutions. Custom hooks have replaced some of their uses, but all three still appear in mature codebases.

---

## Compound Components

Compound components let multiple components share implicit state. Think of \`<select>\` and \`<option>\` — they work together without you passing props between them.

\`\`\`js
// tabs-context.js
const TabsContext = createContext();

function Tabs({ children, defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

Tabs.List = function TabList({ children }) {
  return <div className="tab-list">{children}</div>;
};

Tabs.Tab = function Tab({ id, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  return (
    <button
      className={activeTab === id ? 'active' : ''}
      onClick={() => setActiveTab(id)}
    >
      {children}
    </button>
  );
};

Tabs.Panel = function Panel({ id, children }) {
  const { activeTab } = useContext(TabsContext);
  return activeTab === id ? <div>{children}</div> : null;
};
\`\`\`

**Usage:**
\`\`\`js
<Tabs defaultTab="profile">
  <Tabs.List>
    <Tabs.Tab id="profile">Profile</Tabs.Tab>
    <Tabs.Tab id="settings">Settings</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel id="profile"><ProfileForm /></Tabs.Panel>
  <Tabs.Panel id="settings"><SettingsForm /></Tabs.Panel>
</Tabs>
\`\`\`

The consumer decides the structure. They can add anything between the sub-components. The state is managed internally.

---

## Higher-Order Components (HOC)

An HOC is a function that takes a component and returns an enhanced component. It was the primary code reuse pattern before hooks.

\`\`\`js
function withAuth(WrappedComponent) {
  return function AuthenticatedComponent(props) {
    const { user, loading } = useAuth();

    if (loading) return <Spinner />;
    if (!user) return <Redirect to="/login" />;

    return <WrappedComponent {...props} user={user} />;
  };
}

// Usage
const ProtectedDashboard = withAuth(Dashboard);
\`\`\`

**Problems with HOCs:**
- Prop collisions (HOC and component both define the same prop)
- Hard to trace where props come from ("wrapper hell")
- Multiple HOCs create deeply nested components in DevTools

---

## Render Props

Pass a function as a prop. The component calls it with data, you decide what to render.

\`\`\`js
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  function handleMouseMove(e) {
    setPosition({ x: e.clientX, y: e.clientY });
  }

  return <div onMouseMove={handleMouseMove}>{render(position)}</div>;
}

// Usage
<MouseTracker
  render={({ x, y }) => (
    <p>Mouse is at ({x}, {y})</p>
  )}
/>
\`\`\`

Same power as HOC, but the data flow is explicit. Still more verbose than hooks.

---

## Custom Hooks: The Modern Alternative

Both HOC and Render Props were invented because you couldn't share stateful logic directly. Hooks solve that:

\`\`\`js
// Replace the withAuth HOC with a hook
function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSession().then((u) => { setUser(u); setLoading(false); });
  }, []);

  return { user, loading };
}

// In any component
function Dashboard() {
  const { user, loading } = useAuth();
  if (loading) return <Spinner />;
  if (!user) return <Redirect to="/login" />;
  return <DashboardContent user={user} />;
}
\`\`\`

---

## When to Use Each

| Pattern | Use When |
|---|---|
| Compound Components | You want flexible layout/structure with shared internal state (UI libraries, design systems) |
| HOC | Wrapping third-party components you can't modify, or cross-cutting concerns like analytics |
| Render Props | You need to share logic with libraries that don't support hooks |
| Custom Hooks | Everything else — default choice for new code |

In a modern codebase, you'll primarily write custom hooks. Compound components are excellent for UI library design. HOC and Render Props show up when working with legacy code or libraries.
    `.trim(),
  },

  {
    slug: 'core-web-vitals-guide',
    title: 'Core Web Vitals: LCP, CLS, and INP Explained',
    track: 'frontend',
    tags: ['performance', 'web-vitals', 'lcp', 'cls', 'inp'],
    readingTime: 7,
    content: `
## Core Web Vitals: LCP, CLS, and INP Explained

Core Web Vitals are Google's metrics for real-world user experience. They affect SEO rankings and they come up in frontend interviews at product companies. Here's what you need to know.

---

## LCP — Largest Contentful Paint

**What it measures:** How long until the largest visible element (image, video, text block) is rendered.

**Thresholds:**
- Good: ≤ 2.5s
- Needs improvement: 2.5s – 4s
- Poor: > 4s

**Common causes of poor LCP:**
- Large unoptimized hero images
- Render-blocking resources (CSS/JS in \`<head>\`)
- Slow server response (high TTFB)
- Web fonts blocking text render

**How to fix:**
\`\`\`html
<!-- Preload the hero image — tells browser to fetch it early -->
<link rel="preload" as="image" href="/hero.webp" />

<!-- Modern image format + proper sizing -->
<img
  src="/hero.webp"
  width="1200"
  height="600"
  fetchpriority="high"
  alt="Hero"
/>
\`\`\`

- Convert images to WebP or AVIF
- Use a CDN
- Add \`font-display: swap\` to web fonts so text shows immediately
- Move non-critical JS to the bottom or use \`defer\`/\`async\`

---

## CLS — Cumulative Layout Shift

**What it measures:** Total amount of unexpected layout movement. Score is calculated from the fraction of viewport shifted × the distance shifted.

**Thresholds:**
- Good: ≤ 0.1
- Needs improvement: 0.1 – 0.25
- Poor: > 0.25

**Common causes:**
- Images without explicit width/height (browser doesn't reserve space)
- Ads and embeds inserted without reserved dimensions
- Web fonts causing FOIT/FOUT that shifts text
- Dynamic content injected above existing content

**How to fix:**
\`\`\`css
/* Always set aspect ratio for images */
img {
  width: 100%;
  aspect-ratio: 16 / 9;
}

/* Reserve space for ad slots */
.ad-container {
  min-height: 250px;
}
\`\`\`

\`\`\`html
<!-- Explicit dimensions prevent layout shift -->
<img src="photo.jpg" width="800" height="450" alt="..." />
\`\`\`

- Use \`font-display: optional\` if layout shift from fonts is critical
- Prefer CSS transforms for animations (they don't trigger layout)

---

## INP — Interaction to Next Paint

**What it measures:** Responsiveness. The time from a user interaction (click, key press, tap) to when the browser paints the next frame. Replaced FID (First Input Delay) in March 2024.

**Thresholds:**
- Good: ≤ 200ms
- Needs improvement: 200ms – 500ms
- Poor: > 500ms

**Common causes:**
- Long JavaScript tasks blocking the main thread
- Heavy event handlers doing synchronous work
- Large React component trees re-rendering unnecessarily

**How to fix:**
\`\`\`js
// Break up long tasks with scheduler
function processLargeList(items) {
  let index = 0;

  function processChunk() {
    const deadline = performance.now() + 5; // 5ms budget

    while (index < items.length && performance.now() < deadline) {
      processItem(items[index++]);
    }

    if (index < items.length) {
      setTimeout(processChunk, 0); // yield to browser
    }
  }

  processChunk();
}
\`\`\`

- Defer non-critical JS with \`requestIdleCallback\`
- Use \`React.memo\`, \`useMemo\`, \`useCallback\` to prevent unnecessary renders
- Virtualize long lists (react-window, react-virtual)

---

## Measuring Web Vitals

**In the browser:**
\`\`\`js
import { onLCP, onCLS, onINP } from 'web-vitals';

onLCP(console.log);
onCLS(console.log);
onINP(console.log);
\`\`\`

**Tools:**
- **Lighthouse** (Chrome DevTools) — lab data, simulated conditions
- **PageSpeed Insights** — lab + real-world field data
- **Chrome User Experience Report (CrUX)** — aggregated real-world data
- **Search Console** — shows vitals for your actual pages

---

## Quick Fixes Summary

| Metric | Top Fix |
|---|---|
| LCP | Preload hero image, use WebP, eliminate render-blocking resources |
| CLS | Set explicit image dimensions, reserve space for dynamic content |
| INP | Break up long tasks, reduce main-thread JavaScript, virtualize lists |
    `.trim(),
  },

  {
    slug: 'critical-rendering-path',
    title: 'The Critical Rendering Path: How Browsers Render Pages',
    track: 'frontend',
    tags: ['browser', 'performance', 'rendering', 'dom'],
    readingTime: 7,
    content: `
## The Critical Rendering Path: How Browsers Render Pages

Understanding how browsers turn HTML into pixels is fundamental for performance optimization. This directly affects LCP, FID, and your ability to answer "what happens when you type a URL" questions.

---

## The Pipeline

\`\`\`
HTML → DOM
CSS  → CSSOM
       DOM + CSSOM → Render Tree → Layout → Paint → Composite
\`\`\`

**1. Parse HTML → DOM**
The parser reads the HTML byte by byte and builds the Document Object Model (DOM). It's incremental — the browser starts rendering before the entire HTML is downloaded.

When the parser encounters a \`<script>\` tag (without \`defer\`/\`async\`), it **stops** and waits for the script to download and execute. This is why render-blocking scripts hurt performance.

**2. Parse CSS → CSSOM**
CSS is **render-blocking**. The browser must download and parse all CSS before it can build the render tree. An incomplete CSSOM means no rendering happens.

**3. Render Tree**
The render tree combines DOM nodes and CSSOM styles. It includes only visible nodes — \`display: none\` elements are excluded.

**4. Layout (Reflow)**
The browser calculates the exact size and position of every element. This is expensive. Changes to width, height, margin, padding, or position trigger layout.

**5. Paint (Rasterize)**
Convert the layout into actual pixels. Background colors, text, borders are all painted.

**6. Composite**
Layers are assembled and sent to the GPU. CSS transforms and \`opacity\` changes only require compositing — they skip layout and paint, making them cheap for animations.

---

## What Blocks Rendering

### Render-blocking CSS
All external stylesheets in \`<head>\` block rendering until downloaded and parsed.

\`\`\`html
<!-- Blocks rendering -->
<link rel="stylesheet" href="/styles.css" />

<!-- Non-blocking — load async, apply when ready -->
<link rel="stylesheet" href="/print.css" media="print" />

<!-- Preload critical CSS -->
<link rel="preload" href="/critical.css" as="style" onload="this.rel='stylesheet'" />
\`\`\`

### Render-blocking scripts
By default, \`<script>\` tags pause HTML parsing.

\`\`\`html
<!-- Render-blocking — BAD for performance -->
<script src="/app.js"></script>

<!-- defer: downloads in parallel, executes after HTML parsed, in order -->
<script src="/app.js" defer></script>

<!-- async: downloads in parallel, executes immediately when ready (no order guarantee) -->
<script src="/analytics.js" async></script>
\`\`\`

**Rule of thumb:**
- \`defer\` for app scripts that need DOM ready
- \`async\` for independent scripts (analytics, ads) that don't depend on order

---

## Preload, Prefetch, and Preconnect

\`\`\`html
<!-- preload: high-priority fetch for current page critical resources -->
<link rel="preload" href="/hero.webp" as="image" />
<link rel="preload" href="/font.woff2" as="font" crossorigin />

<!-- prefetch: low-priority fetch for likely next navigation -->
<link rel="prefetch" href="/dashboard.js" />

<!-- preconnect: warm up the connection (DNS + TCP + TLS) -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://api.example.com" crossorigin />
\`\`\`

---

## Triggering Layout vs Paint vs Composite

\`\`\`js
// WORST — triggers layout (reflow)
element.style.width = '100px';
element.style.height = '200px';

// BAD — forces synchronous layout ("layout thrashing")
// Reading layout properties after writes forces recalculation
element.style.width = '100px';
const height = element.offsetHeight; // browser must recalculate layout NOW
element.style.height = height + 'px';

// BETTER — batch reads before writes
const height = element.offsetHeight; // read first
element.style.width = '100px';
element.style.height = height + 'px'; // write after

// BEST for animations — compositor only, no layout or paint
element.style.transform = 'translateX(100px)';
element.style.opacity = '0.5';
\`\`\`

---

## Practical Optimization Checklist

- Put \`<link>\` stylesheets in \`<head>\`, scripts at end of \`<body>\` or use \`defer\`
- Preload your LCP image and critical fonts
- Use \`preconnect\` for third-party origins (fonts, APIs, CDN)
- Animate only \`transform\` and \`opacity\` — they're GPU-composited
- Add \`will-change: transform\` to elements you'll animate (promotes to own layer, use sparingly)
- Avoid layout thrashing: batch DOM reads before writes

---

## How It Connects to Core Web Vitals

- **LCP**: Directly affected by render-blocking resources and late image discovery
- **CLS**: Layout shifts happen during the layout phase — reserve space to prevent them
- **INP**: Long JS tasks block the main thread, preventing paint after interactions
    `.trim(),
  },

  {
    slug: 'typescript-for-js-devs',
    title: 'TypeScript: A Practical Guide for JavaScript Developers',
    track: 'frontend',
    tags: ['typescript', 'javascript', 'types', 'generics'],
    readingTime: 8,
    content: `
## TypeScript: A Practical Guide for JavaScript Developers

TypeScript is now a requirement at most product companies. If you've avoided it, this guide gets you productive fast.

---

## Why TypeScript

- Catches type errors at compile time, not runtime
- Better autocomplete and refactoring in VS Code
- Makes large codebases navigable — types are documentation
- Reduces "cannot read property of undefined" crashes in production

---

## Basic Type Annotations

\`\`\`ts
// Primitives
let name: string = 'Priya';
let age: number = 28;
let isActive: boolean = true;

// Arrays
let ids: number[] = [1, 2, 3];
let names: Array<string> = ['a', 'b'];

// Functions
function add(a: number, b: number): number {
  return a + b;
}

// Optional and default parameters
function greet(name: string, greeting?: string): string {
  return \`\${greeting ?? 'Hello'}, \${name}\`;
}

// Union types
function format(value: string | number): string {
  return String(value);
}
\`\`\`

---

## Interfaces vs Types

Both define the shape of objects. Use \`interface\` for objects/classes; \`type\` for unions, intersections, and primitives.

\`\`\`ts
// Interface — extends naturally, preferred for objects
interface User {
  id: number;
  name: string;
  email?: string; // optional
}

interface Admin extends User {
  role: 'admin';
}

// Type alias — better for unions and computed types
type Status = 'active' | 'inactive' | 'banned';
type ID = string | number;

// Intersection — combine types
type AdminUser = User & { permissions: string[] };
\`\`\`

---

## Generics

Generics let you write reusable code that works with any type while staying type-safe.

\`\`\`ts
// Without generics, you'd use 'any' (loses type safety)
function identity<T>(value: T): T {
  return value;
}

identity<string>('hello'); // returns string
identity<number>(42);      // returns number

// Practical example — typed API response
async function fetchData<T>(url: string): Promise<T> {
  const res = await fetch(url);
  return res.json() as T;
}

const user = await fetchData<User>('/api/user/1');
// TypeScript knows 'user' is of type User

// Generic with constraint
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: 'Arun', age: 25 };
getProperty(user, 'name'); // string
getProperty(user, 'xyz');  // TypeScript error — 'xyz' is not a key of user
\`\`\`

---

## Utility Types

TypeScript ships with built-in types for common transformations.

\`\`\`ts
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Partial — all fields optional (useful for update payloads)
type UserUpdate = Partial<User>;
// { id?: number; name?: string; email?: string; password?: string }

// Required — all fields required
type StrictUser = Required<User>;

// Pick — select specific fields
type PublicUser = Pick<User, 'id' | 'name'>;
// { id: number; name: string }

// Omit — exclude specific fields
type SafeUser = Omit<User, 'password'>;
// { id: number; name: string; email: string }

// ReturnType — extract the return type of a function
function getUser() { return { id: 1, name: 'Rahul' }; }
type UserType = ReturnType<typeof getUser>; // { id: number; name: string }

// Record — dictionary type
type RoleMap = Record<string, string[]>;
const roles: RoleMap = { admin: ['read', 'write'], user: ['read'] };
\`\`\`

---

## Strict Mode

Enable strict mode in \`tsconfig.json\` — it catches the most bugs:

\`\`\`json
{
  "compilerOptions": {
    "strict": true
  }
}
\`\`\`

This enables \`strictNullChecks\` (no implicit null), \`noImplicitAny\`, and others.

---

## Migrating a JS File to TypeScript

Start small. Rename \`.js\` to \`.ts\` and fix errors one at a time.

\`\`\`ts
// BEFORE (JS)
function processOrder(order) {
  return order.items.map(item => ({
    ...item,
    total: item.price * item.quantity
  }));
}

// AFTER (TS)
interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderLineItem extends OrderItem {
  total: number;
}

function processOrder(order: { items: OrderItem[] }): OrderLineItem[] {
  return order.items.map((item) => ({
    ...item,
    total: item.price * item.quantity,
  }));
}
\`\`\`

**Migration strategy:**
1. Add TypeScript to your project (\`npm i -D typescript\`)
2. Set \`"allowJs": true\` in tsconfig initially
3. Migrate files one at a time, starting with utility functions
4. Enable \`strict\` mode once you've migrated the core files
    `.trim(),
  },

  {
    slug: 'frontend-system-design-guide',
    title: 'Frontend System Design: What Interviewers Actually Expect',
    track: 'frontend',
    tags: ['system-design', 'frontend', 'architecture', 'performance'],
    readingTime: 9,
    content: `
## Frontend System Design: What Interviewers Actually Expect

Frontend system design rounds are common at senior levels in product companies. Interviewers aren't looking for a perfect answer — they're evaluating how you think about trade-offs.

---

## The Framework for Any Frontend Design Question

When given a problem, walk through these areas in order:

1. **Clarify requirements** — web or mobile? Which browsers? Scale (users, data volume)?
2. **Component architecture** — break the UI into components
3. **State management** — what data lives where?
4. **API design** — what does the frontend need from the backend?
5. **Performance** — how do you keep it fast?
6. **Accessibility** — keyboard nav, screen readers
7. **Error handling and loading states**

---

## Component Architecture

Decompose the UI into a hierarchy before writing any code:

\`\`\`
Typeahead
├── SearchInput (controlled input, dispatches events)
├── SuggestionList (renders results)
│   └── SuggestionItem (handles click, keyboard nav)
└── LoadingIndicator (shown during fetch)
\`\`\`

**Key decisions:**
- **Smart vs dumb components** — keep data fetching high up, pass data down as props
- **Reusability** — is this component generic or feature-specific?

---

## State Management Decisions

Ask: where does this state need to live?

| State Type | Where to store |
|---|---|
| UI state (modal open, tab selection) | Local \`useState\` |
| Shared UI state (theme, sidebar) | Context API |
| Server state (API data, loading, errors) | React Query / SWR |
| Complex client state (shopping cart, undo history) | Zustand / Redux |
| URL state (filters, pagination) | URL params |

Don't reach for Redux or Zustand by default. Start local, lift state when needed, use a library only when Context causes performance problems.

---

## Performance Considerations

**Code splitting:**
\`\`\`js
// Lazy load routes and heavy components
const Dashboard = React.lazy(() => import('./Dashboard'));
const Editor = React.lazy(() => import('./Editor'));

// Wrap with Suspense
<Suspense fallback={<Spinner />}>
  <Dashboard />
</Suspense>
\`\`\`

**Virtualization for large lists:**
\`\`\`js
import { FixedSizeList } from 'react-window';

// Renders only visible rows, not all 10,000
<FixedSizeList
  height={600}
  itemCount={10000}
  itemSize={50}
>
  {({ index, style }) => <Row key={index} style={style} item={data[index]} />}
</FixedSizeList>
\`\`\`

**Caching with React Query:**
\`\`\`js
const { data, isLoading } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
  staleTime: 5 * 60 * 1000, // cache for 5 minutes
});
\`\`\`

---

## Designing a Typeahead Component End-to-End

**Requirements:** Search input that shows suggestions as user types. Used on e-commerce product search.

### API Contract
\`\`\`
GET /api/search/suggestions?q=iphone&limit=10
Response: { suggestions: [{ id, title, category, score }] }
\`\`\`

### Key implementation decisions:

**1. Debounce input**
\`\`\`js
const debouncedQuery = useDebounce(query, 300);
useEffect(() => {
  if (debouncedQuery.length >= 2) fetchSuggestions(debouncedQuery);
}, [debouncedQuery]);
\`\`\`

**2. Cancel stale requests**
\`\`\`js
useEffect(() => {
  const controller = new AbortController();
  fetch(\`/api/suggestions?q=\${query}\`, { signal: controller.signal });
  return () => controller.abort();
}, [query]);
\`\`\`

**3. Cache recent results**
\`\`\`js
const cache = useRef(new Map());

async function getSuggestions(q) {
  if (cache.current.has(q)) return cache.current.get(q);
  const data = await fetchSuggestions(q);
  cache.current.set(q, data);
  return data;
}
\`\`\`

**4. Keyboard navigation**
\`\`\`js
function handleKeyDown(e) {
  if (e.key === 'ArrowDown') setHighlighted((h) => Math.min(h + 1, suggestions.length - 1));
  if (e.key === 'ArrowUp') setHighlighted((h) => Math.max(h - 1, 0));
  if (e.key === 'Enter') selectSuggestion(suggestions[highlighted]);
  if (e.key === 'Escape') closeSuggestions();
}
\`\`\`

**5. Accessibility**
- \`role="combobox"\` on input, \`role="listbox"\` on suggestions
- \`aria-expanded\`, \`aria-activedescendant\` on input
- \`aria-selected\` on active suggestion

---

## Micro-Frontends (Mention When Relevant)

For large teams working on the same app: split the frontend by domain (checkout, catalog, account) so teams deploy independently. Tools: Module Federation (Webpack 5), single-spa.

Trade-offs: increased complexity, larger bundle (shared deps need deduplication), cross-team coordination for shared components.

---

## What Interviewers Look For

- Do you ask clarifying questions before designing?
- Do you discuss trade-offs instead of stating absolutes?
- Do you think about failure states, loading, and edge cases?
- Do you bring up accessibility unprompted?
- Can you articulate why you chose React Query over Redux?
    `.trim(),
  },

  // ─── BACKEND ───────────────────────────────────────────────────────────────

  {
    slug: 'http-and-rest-apis',
    title: 'HTTP & REST APIs: Everything an SDE Must Know',
    track: 'backend',
    tags: ['http', 'rest', 'api', 'backend'],
    readingTime: 7,
    content: `
## HTTP & REST APIs: Everything an SDE Must Know

HTTP is the backbone of every web application. Interviews at product companies regularly test whether you understand what's happening under the hood.

---

## HTTP Methods

| Method | Purpose | Idempotent? | Safe? |
|---|---|---|---|
| GET | Retrieve resource | Yes | Yes |
| POST | Create resource | No | No |
| PUT | Replace entire resource | Yes | No |
| PATCH | Partial update | No | No |
| DELETE | Remove resource | Yes | No |

**Key distinctions:**
- **Idempotent**: calling it multiple times has the same effect as calling it once
- **Safe**: doesn't modify server state
- Use \`PUT\` when you send the complete resource; \`PATCH\` when sending only changed fields

---

## HTTP Status Codes

**2xx — Success**
- \`200 OK\` — standard success
- \`201 Created\` — resource created (use with POST)
- \`204 No Content\` — success, no body (use with DELETE)

**3xx — Redirection**
- \`301 Moved Permanently\` — use for SEO-safe URL changes
- \`302 Found\` — temporary redirect
- \`304 Not Modified\` — cached response is still valid (ETag/Last-Modified)

**4xx — Client Errors**
- \`400 Bad Request\` — malformed input, validation errors
- \`401 Unauthorized\` — not authenticated
- \`403 Forbidden\` — authenticated but no permission
- \`404 Not Found\`
- \`409 Conflict\` — e.g., duplicate resource
- \`422 Unprocessable Entity\` — validation failed (semantically invalid)
- \`429 Too Many Requests\` — rate limited

**5xx — Server Errors**
- \`500 Internal Server Error\` — generic server bug
- \`502 Bad Gateway\` — upstream server returned an invalid response
- \`503 Service Unavailable\` — server overloaded or down for maintenance
- \`504 Gateway Timeout\` — upstream server timed out

---

## REST Constraints

REST isn't a protocol — it's an architectural style with 6 constraints:

1. **Client-Server**: separation of concerns
2. **Stateless**: every request contains all info needed to process it. No session on server.
3. **Cacheable**: responses must define cacheability
4. **Layered System**: client can't tell if it's talking directly to the server or a proxy
5. **Uniform Interface**: consistent, predictable URLs (the one that matters most in interviews)
6. **Code on Demand** (optional): server can send executable code (e.g., JavaScript)

**HATEOAS** (Hypermedia as the Engine of Application State): responses include links to related actions. Rarely implemented in practice, but worth knowing the term.

---

## Key Headers

\`\`\`
Content-Type: application/json          # body format
Accept: application/json                # client's preferred response format
Authorization: Bearer <token>           # authentication
Cache-Control: max-age=3600             # caching rules
ETag: "abc123"                          # resource version for conditional requests
X-RateLimit-Remaining: 90              # rate limiting info
\`\`\`

---

## CORS

Cross-Origin Resource Sharing: a browser security mechanism that restricts HTTP requests to different origins.

\`\`\`
# Server must send these headers to allow cross-origin requests
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: Content-Type, Authorization
\`\`\`

For non-simple requests (anything with a custom header or non-GET/POST), the browser sends a **preflight** OPTIONS request first. The server must respond with the allowed methods/headers before the actual request proceeds.

---

## HTTP/2 Improvements

HTTP/1.1 had a problem: browsers opened 6 parallel connections per domain to work around head-of-line blocking.

HTTP/2 fixes this with:
- **Multiplexing**: multiple requests over a single TCP connection, no blocking
- **Header compression** (HPACK): reduces overhead for repeated headers
- **Server Push**: server can proactively send resources the client will need
- **Binary framing**: more efficient than text-based HTTP/1.1

In practice, upgrading to HTTP/2 is one of the easiest performance wins — most CDNs and web servers support it with a config flag.

---

## REST API Design Quick Reference

\`\`\`
GET    /users          → list users
POST   /users          → create user
GET    /users/:id      → get user
PUT    /users/:id      → replace user
PATCH  /users/:id      → update user fields
DELETE /users/:id      → delete user

GET    /users/:id/posts  → user's posts (nested resource)

# Filtering, pagination, sorting via query params
GET    /posts?status=published&page=2&limit=20&sort=-createdAt
\`\`\`
    `.trim(),
  },

  {
    slug: 'jwt-authentication-guide',
    title: 'JWT Authentication with Refresh Tokens',
    track: 'backend',
    tags: ['jwt', 'authentication', 'security', 'tokens'],
    readingTime: 7,
    content: `
## JWT Authentication with Refresh Tokens

JWT is the most common authentication mechanism in modern APIs. This article covers the full flow, storage strategy, and security pitfalls.

---

## What Is a JWT?

A JWT (JSON Web Token) is a base64url-encoded string in three parts separated by dots:

\`\`\`
eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEyMywicm9sZSI6InVzZXIifQ.ABC123signature
       HEADER                          PAYLOAD                      SIGNATURE
\`\`\`

- **Header**: algorithm (HS256, RS256) and type
- **Payload**: claims — userId, role, exp (expiry), iat (issued at)
- **Signature**: HMAC(header + payload, secret) — proves the token wasn't tampered with

The payload is **base64-encoded, not encrypted**. Anyone can decode it. Never put sensitive data (passwords, credit cards) in a JWT payload.

---

## JWT vs Sessions

| | JWT | Sessions |
|---|---|---|
| State | Stateless — no DB lookup | Stateful — session in DB/Redis |
| Scaling | Easy (no shared state between servers) | Needs shared session store |
| Revocation | Hard — valid until expiry | Easy — delete session |
| Payload | User data in token | Session ID only |

**Use JWT when**: stateless APIs, microservices, mobile clients
**Use sessions when**: you need instant revocation (bank logout, banned users)

---

## Access Token + Refresh Token Flow

Short-lived access tokens + long-lived refresh tokens solve the revocation problem:

\`\`\`
1. User logs in with credentials
2. Server returns:
   - Access token (expires in 15 min)
   - Refresh token (expires in 7 days, stored in DB)

3. Client sends access token in every request:
   Authorization: Bearer <access_token>

4. When access token expires (401 response):
   - Client sends refresh token to /auth/refresh
   - Server validates refresh token against DB
   - Server returns new access token (and optionally new refresh token)

5. On logout:
   - Delete refresh token from DB
   - Client discards both tokens
\`\`\`

\`\`\`js
// Server: generate tokens
import jwt from 'jsonwebtoken';

function generateTokens(userId) {
  const accessToken = jwt.sign(
    { userId, type: 'access' },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { userId, type: 'refresh' },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
}

// Server: verify access token (middleware)
function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
\`\`\`

---

## Where to Store Tokens

**localStorage:**
- Easy to use
- Accessible to JavaScript — vulnerable to XSS attacks
- If any script on your page is compromised, tokens are stolen

**httpOnly cookies:**
- Cannot be read by JavaScript — XSS-safe
- Automatically sent with requests to the same origin
- Vulnerable to CSRF — mitigate with \`SameSite=Strict\` or CSRF tokens

**Recommendation:**
- Store access token in memory (JS variable) — lost on page refresh but XSS-safe
- Store refresh token in httpOnly cookie
- Use the refresh token to get a new access token on every page load

\`\`\`js
// Set refresh token as httpOnly cookie
res.cookie('refreshToken', refreshToken, {
  httpOnly: true,
  secure: true,      // HTTPS only
  sameSite: 'Strict',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
});
\`\`\`

---

## Blacklisting Tokens

JWTs can't be revoked before expiry unless you maintain a blacklist:

\`\`\`js
// On logout or token compromise:
await redis.setex(\`blacklist:\${tokenId}\`, 900, '1'); // 900s = 15min access token TTL

// In auth middleware:
const isBlacklisted = await redis.get(\`blacklist:\${payload.jti}\`);
if (isBlacklisted) return res.status(401).json({ error: 'Token revoked' });
\`\`\`

Include a \`jti\` (JWT ID) claim in your tokens to identify them uniquely.

---

## Common Security Mistakes

1. **Algorithm confusion**: never accept \`alg: "none"\` — always specify the expected algorithm explicitly
2. **Storing sensitive data** in payload — it's base64, not encrypted
3. **Not validating \`exp\`** — always verify expiry
4. **Weak secrets** — use at least 256 bits of randomness for HS256
5. **Long-lived access tokens** — keep them short (15 min max)
6. **No refresh token rotation** — issue a new refresh token on every use, invalidate the old one
    `.trim(),
  },

  {
    slug: 'sql-fundamentals-guide',
    title: 'SQL Mastery: JOINs, Subqueries, Indexes & EXPLAIN',
    track: 'backend',
    tags: ['sql', 'database', 'joins', 'indexes', 'performance'],
    readingTime: 9,
    content: `
## SQL Mastery: JOINs, Subqueries, Indexes & EXPLAIN

SQL is tested in almost every backend interview. This covers everything from JOIN types to explaining query plans.

---

## JOIN Types

Assume tables: \`users(id, name)\` and \`orders(id, user_id, total)\`

\`\`\`sql
-- INNER JOIN: only matching rows from both tables
SELECT u.name, o.total
FROM users u
INNER JOIN orders o ON u.id = o.user_id;
-- Returns only users who have orders

-- LEFT JOIN: all rows from left, matching rows from right (NULL if no match)
SELECT u.name, o.total
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;
-- Returns all users; total is NULL for users with no orders

-- RIGHT JOIN: all rows from right, matching from left (rarely used — flip the tables instead)
SELECT u.name, o.total
FROM users u
RIGHT JOIN orders o ON u.id = o.user_id;

-- FULL OUTER JOIN: all rows from both, NULLs where no match
SELECT u.name, o.total
FROM users u
FULL OUTER JOIN orders o ON u.id = o.user_id;

-- SELF JOIN: table joined with itself
-- Example: find all employees and their managers
SELECT e.name AS employee, m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;
\`\`\`

---

## GROUP BY, HAVING vs WHERE

\`\`\`sql
-- WHERE filters rows before grouping
-- HAVING filters groups after aggregation

-- Wrong: can't use aggregate in WHERE
SELECT user_id, COUNT(*) as order_count
FROM orders
WHERE COUNT(*) > 5          -- ERROR
GROUP BY user_id;

-- Right: use HAVING for post-aggregation filters
SELECT user_id, COUNT(*) as order_count
FROM orders
WHERE status = 'completed'  -- filter rows first
GROUP BY user_id
HAVING COUNT(*) > 5;        -- then filter groups
\`\`\`

---

## Subqueries vs CTEs

\`\`\`sql
-- Subquery (inline)
SELECT name
FROM users
WHERE id IN (
  SELECT user_id FROM orders WHERE total > 1000
);

-- CTE (Common Table Expression) — WITH clause, much more readable
WITH high_value_orders AS (
  SELECT user_id FROM orders WHERE total > 1000
)
SELECT name
FROM users
WHERE id IN (SELECT user_id FROM high_value_orders);

-- CTEs can be chained
WITH
  active_users AS (SELECT id FROM users WHERE status = 'active'),
  recent_orders AS (SELECT user_id, COUNT(*) as cnt FROM orders WHERE created_at > NOW() - INTERVAL '30 days' GROUP BY user_id)
SELECT u.id, ro.cnt
FROM active_users u
JOIN recent_orders ro ON u.id = ro.user_id;
\`\`\`

Prefer CTEs over deeply nested subqueries — they're easier to read, debug, and maintain.

---

## Indexes

An index is a data structure (usually a B-tree) that lets the database find rows without scanning the entire table.

\`\`\`sql
-- Create an index
CREATE INDEX idx_orders_user_id ON orders(user_id);

-- Composite index — column order matters
-- This index helps queries filtering on (user_id), (user_id + status), but NOT status alone
CREATE INDEX idx_orders_user_status ON orders(user_id, status);

-- Partial index — only index a subset of rows
CREATE INDEX idx_active_users ON users(email) WHERE status = 'active';
\`\`\`

**When indexes help:**
- Columns used in WHERE, JOIN ON, ORDER BY
- High-cardinality columns (many unique values)
- Large tables

**When indexes hurt:**
- INSERT/UPDATE/DELETE are slower (index must be updated)
- Low-cardinality columns (e.g., boolean status — DB may skip the index anyway)
- Overly many indexes on write-heavy tables

---

## EXPLAIN and EXPLAIN ANALYZE

\`\`\`sql
-- Show the query plan
EXPLAIN SELECT * FROM orders WHERE user_id = 42;

-- Show plan + actual execution stats (runs the query)
EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 42;
\`\`\`

**What to look for:**
- \`Seq Scan\` — full table scan, bad on large tables
- \`Index Scan\` — using an index, good
- \`Nested Loop\` vs \`Hash Join\` — join strategies
- \`rows=\` estimate vs actual rows — big differences indicate stale statistics
- \`actual time\` — where time is actually being spent

---

## The N+1 Query Problem

\`\`\`sql
-- You fetch 100 users
SELECT * FROM users;

-- Then for EACH user, you fetch their orders
-- This runs 1 + 100 = 101 queries!
SELECT * FROM orders WHERE user_id = 1;
SELECT * FROM orders WHERE user_id = 2;
-- ... 98 more

-- FIX: one JOIN query
SELECT u.id, u.name, o.id as order_id, o.total
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;
\`\`\`

N+1 is often introduced by ORMs with lazy loading enabled by default. Use eager loading or write explicit JOINs for related data.

---

## Quick Reference

\`\`\`sql
-- Find users with no orders
SELECT u.name
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.id IS NULL;

-- Top 5 customers by spend
SELECT user_id, SUM(total) as revenue
FROM orders
GROUP BY user_id
ORDER BY revenue DESC
LIMIT 5;

-- Running total (window function)
SELECT id, total, SUM(total) OVER (ORDER BY created_at) as running_total
FROM orders;
\`\`\`
    `.trim(),
  },

  {
    slug: 'acid-transactions-guide',
    title: 'ACID Properties & Database Transactions',
    track: 'backend',
    tags: ['database', 'acid', 'transactions', 'sql'],
    readingTime: 7,
    content: `
## ACID Properties & Database Transactions

ACID is a standard interview question for backend roles. Understanding it deeply — including isolation levels — separates strong candidates from average ones.

---

## What Is a Transaction?

A transaction is a sequence of operations treated as a single unit of work. Either all operations succeed, or none of them do.

\`\`\`sql
-- Transfer ₹1000 from account A to account B
BEGIN;
  UPDATE accounts SET balance = balance - 1000 WHERE id = 'A';
  UPDATE accounts SET balance = balance + 1000 WHERE id = 'B';
COMMIT;  -- both succeed, or:
ROLLBACK; -- undo everything if anything fails
\`\`\`

---

## ACID Properties

### Atomicity — All or Nothing

If any operation in a transaction fails, the entire transaction is rolled back. The database is left unchanged.

**Real-world**: If the debit succeeds but the credit fails (network error), the debit is reversed. The money doesn't disappear.

### Consistency

A transaction takes the database from one valid state to another. All integrity constraints (foreign keys, unique constraints, check constraints) must hold after the transaction.

**Real-world**: You can't transfer money from an account that doesn't exist. The foreign key constraint prevents it.

### Isolation

Concurrent transactions execute as if they were sequential. One transaction's intermediate state is invisible to others.

This is the most nuanced property. See isolation levels below.

### Durability

Once a transaction is committed, it's permanent — even if the server crashes immediately after. This is achieved through **Write-Ahead Logging (WAL)**: changes are written to a log file before being applied to the data files. On recovery, the DB replays the log.

---

## Isolation Levels

Four levels, each preventing different concurrency anomalies:

### Anomalies
- **Dirty Read**: read uncommitted data from another transaction (data that may be rolled back)
- **Non-repeatable Read**: read the same row twice in one transaction and get different values (because another transaction committed a change in between)
- **Phantom Read**: re-run a query and get different rows (because another transaction inserted/deleted rows)

### Levels (weakest to strongest)

**READ UNCOMMITTED**
- Can see uncommitted changes from other transactions
- Allows: dirty reads, non-repeatable reads, phantom reads
- Rarely used — practically no protection

**READ COMMITTED** (PostgreSQL default)
- Only sees committed data
- Prevents dirty reads
- Allows: non-repeatable reads, phantom reads

\`\`\`sql
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
BEGIN;
SELECT balance FROM accounts WHERE id = 'A'; -- 1000
-- another transaction commits a change
SELECT balance FROM accounts WHERE id = 'A'; -- 800 (different result!)
COMMIT;
\`\`\`

**REPEATABLE READ** (MySQL InnoDB default)
- Same row returns the same value throughout the transaction
- Prevents dirty reads, non-repeatable reads
- Allows: phantom reads (in theory; MySQL's implementation prevents them too)

**SERIALIZABLE** (strongest)
- Full isolation — transactions run as if sequential
- Prevents all anomalies
- Highest contention; slowest

---

## Practical Isolation Level Choices

\`\`\`sql
-- For financial transactions: use SERIALIZABLE or REPEATABLE READ
BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;
  SELECT balance FROM accounts WHERE id = 'A';
  -- no other transaction can modify this row until we commit
  UPDATE accounts SET balance = balance - 1000 WHERE id = 'A';
COMMIT;

-- For reporting queries: READ COMMITTED is fine
-- For inventory management (check-then-update): REPEATABLE READ or higher
\`\`\`

---

## Savepoints

\`\`\`sql
BEGIN;
  INSERT INTO orders (user_id, total) VALUES (1, 500);
  SAVEPOINT after_order;

  INSERT INTO order_items (order_id, product_id) VALUES (LASTVAL(), 99);

  -- If item insert fails
  ROLLBACK TO SAVEPOINT after_order; -- only undo the item, keep the order
COMMIT;
\`\`\`

---

## Quick Summary Table

| Isolation Level | Dirty Read | Non-Repeatable Read | Phantom Read |
|---|---|---|---|
| READ UNCOMMITTED | Possible | Possible | Possible |
| READ COMMITTED | Prevented | Possible | Possible |
| REPEATABLE READ | Prevented | Prevented | Possible |
| SERIALIZABLE | Prevented | Prevented | Prevented |

**Interview tip**: When asked "what isolation level would you use for X?", the answer is usually READ COMMITTED for general OLTP + SERIALIZABLE for financial/critical operations. Explain the trade-off: higher isolation = more locking = less concurrency.
    `.trim(),
  },

  {
    slug: 'nosql-mongodb-guide',
    title: 'NoSQL & MongoDB: When and How to Use It',
    track: 'backend',
    tags: ['mongodb', 'nosql', 'database', 'document-model'],
    readingTime: 7,
    content: `
## NoSQL & MongoDB: When and How to Use It

Choosing the right database is a system design fundamental. Here's how to think about NoSQL vs relational, and how MongoDB works in practice.

---

## Document Model vs Relational

**Relational (SQL)**: data in tables with rows and columns, strict schema, relationships via foreign keys, normalized to avoid duplication.

**Document (MongoDB)**: data stored as JSON-like documents, flexible schema, related data can be embedded or referenced.

\`\`\`js
// SQL: user and their address in separate tables
// users: { id, name, email }
// addresses: { id, user_id, street, city }

// MongoDB: address embedded in user document
{
  "_id": ObjectId("..."),
  "name": "Priya Sharma",
  "email": "priya@example.com",
  "address": {
    "street": "12 MG Road",
    "city": "Bangalore",
    "pin": "560001"
  },
  "tags": ["premium", "verified"]
}
\`\`\`

---

## When NoSQL Wins

- **Flexible/evolving schema**: different users have different fields (product catalog with varying attributes)
- **Horizontal scaling**: MongoDB shards across machines natively; SQL requires significant effort
- **High write throughput**: event logging, clickstream, IoT sensor data
- **Hierarchical or tree-like data**: document model fits naturally, JOINs would be painful
- **Rapid prototyping**: no migration scripts for schema changes

---

## MongoDB: Core Concepts

- **Database** → **Collection** (≈ table) → **Document** (≈ row)
- Documents have a unique \`_id\` field (ObjectId by default)

### CRUD Operations
\`\`\`js
const { MongoClient } = require('mongodb');
const db = client.db('myapp');
const users = db.collection('users');

// Create
await users.insertOne({ name: 'Arjun', email: 'arjun@example.com' });
await users.insertMany([{ name: 'Kavya' }, { name: 'Rohan' }]);

// Read
const user = await users.findOne({ email: 'arjun@example.com' });
const allActive = await users.find({ status: 'active' }).toArray();

// Update
await users.updateOne(
  { _id: userId },
  { $set: { status: 'inactive' }, $inc: { loginCount: 1 } }
);

// Delete
await users.deleteOne({ _id: userId });

// Query operators
await users.find({
  age: { $gte: 18, $lte: 30 },
  city: { $in: ['Bangalore', 'Hyderabad'] }
}).sort({ name: 1 }).limit(20).toArray();
\`\`\`

---

## Embedded vs Referenced Documents

\`\`\`js
// EMBEDDED — store related data inside the document
// Good for: data that's always read together, 1:few relationships
{
  "_id": "order_123",
  "userId": "user_456",
  "items": [
    { "productId": "p1", "qty": 2, "price": 499 },
    { "productId": "p2", "qty": 1, "price": 999 }
  ]
}

// REFERENCED — store a reference (like a foreign key)
// Good for: data accessed independently, 1:many/many:many, large sub-documents
{
  "_id": "order_123",
  "userId": ObjectId("user_456"),  // reference to users collection
  "items": [ObjectId("item_1"), ObjectId("item_2")]
}
\`\`\`

**Rule of thumb**: Embed when you always need the data together and the embedded data won't grow unboundedly. Reference when the related data is large, frequently updated independently, or shared across documents.

---

## Indexes in MongoDB

\`\`\`js
// Single field index
await users.createIndex({ email: 1 }); // 1 = ascending, -1 = descending

// Compound index
await users.createIndex({ city: 1, status: 1 });

// Text index for full-text search
await products.createIndex({ title: 'text', description: 'text' });
await products.find({ $text: { $search: 'bluetooth speaker' } });

// Use explain() to see if an index is being used
await users.find({ email: 'test@test.com' }).explain('executionStats');
\`\`\`

---

## Aggregation Pipeline

\`\`\`js
// Group orders by user and sum their revenue
const result = await orders.aggregate([
  { $match: { status: 'completed' } },          // filter
  { $group: {
      _id: '$userId',
      totalRevenue: { $sum: '$amount' },
      orderCount: { $sum: 1 }
  }},
  { $sort: { totalRevenue: -1 } },              // sort
  { $limit: 10 },                               // top 10
  { $lookup: {                                  // JOIN with users collection
      from: 'users',
      localField: '_id',
      foreignField: '_id',
      as: 'user'
  }},
]).toArray();
\`\`\`

---

## When NOT to Use NoSQL

- **Complex transactions**: transferring money between accounts needs ACID. MongoDB has multi-document transactions, but they're complex and slower.
- **Complex relationships**: if you have many-to-many relationships with frequent JOINs, relational wins
- **Strong consistency requirements**: MongoDB's default is eventual consistency in some configurations
- **Reporting and analytics**: SQL with window functions and CTEs is far more expressive
    `.trim(),
  },

  {
    slug: 'redis-caching-guide',
    title: 'Redis: Caching, Sessions, Rate Limiting & More',
    track: 'backend',
    tags: ['redis', 'caching', 'performance', 'backend'],
    readingTime: 7,
    content: `
## Redis: Caching, Sessions, Rate Limiting & More

Redis is an in-memory data structure store. It's used in nearly every production backend for caching, sessions, rate limiting, and message passing. It comes up in almost every system design interview.

---

## Core Data Structures

| Structure | Use Case |
|---|---|
| String | Caching, counters, flags |
| Hash | Object storage (user session data) |
| List | Task queues, activity feeds |
| Set | Unique items, tags, social graphs |
| Sorted Set | Leaderboards, rate limiting windows |

---

## Cache-Aside Pattern

The most common caching strategy. Application code manages the cache.

\`\`\`js
const redis = require('redis');
const client = redis.createClient();

async function getUserById(userId) {
  const cacheKey = \`user:\${userId}\`;

  // 1. Check cache
  const cached = await client.get(cacheKey);
  if (cached) {
    return JSON.parse(cached); // cache hit
  }

  // 2. Cache miss — fetch from DB
  const user = await db.query('SELECT * FROM users WHERE id = ?', [userId]);

  // 3. Store in cache with TTL
  await client.setEx(cacheKey, 3600, JSON.stringify(user)); // 1 hour

  return user;
}

// Invalidate on update
async function updateUser(userId, data) {
  await db.query('UPDATE users SET ? WHERE id = ?', [data, userId]);
  await client.del(\`user:\${userId}\`); // delete from cache
}
\`\`\`

---

## Session Storage

Redis is ideal for sessions: fast reads, TTL for auto-expiry, horizontally scalable.

\`\`\`js
// Store session as a Hash (each field is a separate key)
await client.hSet(\`session:\${sessionId}\`, {
  userId: '123',
  role: 'admin',
  lastActive: Date.now().toString(),
});
await client.expire(\`session:\${sessionId}\`, 86400); // 24 hours

// Retrieve session
const session = await client.hGetAll(\`session:\${sessionId}\`);

// Update single field without re-writing entire session
await client.hSet(\`session:\${sessionId}\`, 'lastActive', Date.now().toString());
\`\`\`

---

## Rate Limiting with Sorted Sets (Sliding Window)

\`\`\`js
async function isRateLimited(userId, maxRequests = 100, windowMs = 60000) {
  const now = Date.now();
  const windowStart = now - windowMs;
  const key = \`ratelimit:\${userId}\`;

  // Remove requests older than the window
  await client.zRemRangeByScore(key, 0, windowStart);

  // Count requests in current window
  const requestCount = await client.zCard(key);

  if (requestCount >= maxRequests) {
    return true; // rate limited
  }

  // Add current request
  await client.zAdd(key, { score: now, value: \`\${now}-\${Math.random()}\` });
  await client.expire(key, Math.ceil(windowMs / 1000));

  return false;
}
\`\`\`

---

## Pub/Sub Pattern

\`\`\`js
// Publisher (e.g., when order is placed)
const publisher = redis.createClient();
await publisher.publish('order:created', JSON.stringify({
  orderId: '123',
  userId: '456',
  total: 999
}));

// Subscriber (e.g., email service, inventory service)
const subscriber = redis.createClient();
await subscriber.subscribe('order:created', (message) => {
  const order = JSON.parse(message);
  sendConfirmationEmail(order.userId, order.orderId);
});
\`\`\`

Pub/Sub is fire-and-forget — if no subscribers are listening, the message is lost. For reliable messaging, use a proper queue (BullMQ, Kafka).

---

## TTL and Eviction Policies

\`\`\`js
// Set TTL at creation
await client.setEx('key', 300, 'value'); // expires in 300 seconds

// Set TTL on existing key
await client.expire('key', 300);

// Check remaining TTL
await client.ttl('key'); // seconds remaining, -1 if no TTL, -2 if not found
\`\`\`

**Eviction policies** (when Redis runs out of memory):

| Policy | Behavior |
|---|---|
| \`noeviction\` | Return error on write — default |
| \`allkeys-lru\` | Evict least recently used keys |
| \`volatile-lru\` | Evict LRU keys that have a TTL |
| \`allkeys-lfu\` | Evict least frequently used |

For a cache use case, set \`maxmemory-policy allkeys-lru\`.

---

## Redis in System Design Interviews

When designing a system, mention Redis for:
- **Database query caching**: reduce load on primary DB (cache-aside)
- **Session store**: share sessions across multiple API servers
- **Rate limiting**: sliding window counter per user/IP
- **Leaderboards**: sorted sets give O(log N) rank operations
- **Distributed locking**: \`SET key value NX EX 30\` for leader election or job deduplication
- **Job queues**: BullMQ builds reliable queues on top of Redis lists/streams

The trade-off to always mention: Redis is in-memory — it's fast but not durable by default. Configure AOF (Append Only File) or RDB snapshots for persistence if data loss matters.
    `.trim(),
  },

  {
    slug: 'microservices-vs-monolith',
    title: 'Microservices vs Monolith: Making the Right Choice',
    track: 'backend',
    tags: ['architecture', 'microservices', 'monolith', 'system-design'],
    readingTime: 7,
    content: `
## Microservices vs Monolith: Making the Right Choice

This is a system design topic that separates engineers who think at the architecture level from those who don't. Here's a clear-headed look at both.

---

## What Is a Monolith?

A monolith is a single deployable unit containing all the functionality of your application. One codebase, one deployment, one process.

**Don't mistake simple for bad.** A well-structured monolith handles millions of users. Stack Overflow, Shopify, and Basecamp are monoliths. The monolith is the correct starting point for most applications.

**Advantages:**
- Simple to develop, test, and deploy
- Easy to run locally
- In-process function calls (no network overhead)
- Easy to refactor across components
- No distributed systems complexity

**When monoliths struggle:**
- Single large team working on the same codebase (merge conflicts, slow CI)
- One module's spike in traffic requires scaling the entire app
- Different parts need different tech stacks or release cycles
- Long deployments block teams

---

## Microservices Architecture

Each service owns a specific business domain (users, orders, payments, notifications) and is deployed independently.

\`\`\`
Client
  │
  ▼
API Gateway ──► User Service    (Node.js + PostgreSQL)
                Order Service   (Java + MySQL)
                Payment Service (Go + PostgreSQL)
                Notification    (Python + Redis)
\`\`\`

**Advantages:**
- Independent deployments — teams don't block each other
- Independent scaling — scale only the service that needs it
- Technology freedom — each service can use the best tool for the job
- Fault isolation — one service failing doesn't take down everything

**Real trade-offs (what interviews want to hear):**
- Network calls instead of in-process calls — latency, retries, timeouts
- Distributed transactions are hard — no ACID across services
- Service discovery, load balancing, circuit breaking complexity
- Debugging across services requires distributed tracing
- Operational overhead: multiple CI/CD pipelines, monitoring per service

---

## Service Communication

### Synchronous — HTTP/REST or gRPC
\`\`\`
Order Service → POST /payments/charge → Payment Service
             ← 200 OK ←
\`\`\`
- Simple to reason about
- Creates coupling — Order Service waits for Payment Service
- If Payment Service is down, order fails

### Asynchronous — Message Queue (Kafka, RabbitMQ)
\`\`\`
Order Service → [order.placed event] → Message Broker → Payment Service
                                                       → Notification Service
\`\`\`
- Decoupled — services don't need to be up simultaneously
- Resilient — messages are stored until consumed
- More complex to reason about — eventual consistency

---

## API Gateway Pattern

\`\`\`
Client
  │
  ▼
API Gateway
├── Auth (verify JWT)
├── Rate limiting
├── Route: /users/*    → User Service
├── Route: /orders/*   → Order Service
├── Route: /products/* → Product Service
└── Response aggregation (BFF pattern)
\`\`\`

The gateway is a single entry point that handles cross-cutting concerns: authentication, routing, rate limiting, SSL termination, and request/response transformation.

---

## Distributed Transactions Problem

\`\`\`
PLACE ORDER — must: reserve inventory + charge payment + create order

// In a monolith:
BEGIN TRANSACTION;
  inventory.reserve(item);
  payment.charge(user, amount);
  orders.create(...);
COMMIT; // atomic

// In microservices:
// There is NO COMMIT across services
// Inventory Service, Payment Service, Order Service are separate DBs
\`\`\`

Solutions:
- **SAGA pattern**: sequence of local transactions, each publishing events. On failure, compensating transactions undo completed steps.
- **Two-Phase Commit (2PC)**: coordinator asks all services to prepare, then commit. Rarely used — complex and creates blocking.
- **Eventual consistency**: accept that the system will be consistent eventually, not immediately.

---

## When to Choose What

**Start with a monolith if:**
- You're building a new product (don't know domain boundaries yet)
- Team size is < 15 engineers
- You're validating product-market fit
- You need to move fast

**Move to microservices when:**
- Specific parts need independent scaling (Black Friday hitting your order service, not your blog)
- Team size forces independent deployments
- Parts need different SLAs or tech stacks
- You have clear domain boundaries after running the monolith

**Modular monolith as a middle path:**
Organize your monolith into clearly bounded modules (same process, separate packages). You get team independence without the distributed systems complexity. Easy to split into services later.

---

## Interview Takeaway

When asked "monolith vs microservices" never give a one-sided answer. Show you understand both contexts. A confident answer: "I'd start with a monolith for speed, design clear module boundaries, and extract services only when we hit a concrete scaling or team coordination problem."
    `.trim(),
  },

  {
    slug: 'message-queues-kafka-guide',
    title: 'Message Queues & Kafka: Async Communication in Distributed Systems',
    track: 'backend',
    tags: ['kafka', 'message-queue', 'distributed-systems', 'async'],
    readingTime: 8,
    content: `
## Message Queues & Kafka: Async Communication in Distributed Systems

Message queues are the backbone of event-driven architectures. Kafka in particular appears in almost every system design interview for backend roles.

---

## Why Message Queues Exist

**Problem**: Service A needs to notify Service B, but:
- B might be temporarily down
- A shouldn't wait for B to respond (latency)
- B can only handle 100 requests/second, but A sends 1000/second (load leveling)
- Multiple services (C, D, E) also need to know about the same event

**Solution**: A publishes a message to a queue. B (and C, D, E) consume from it asynchronously.

\`\`\`
Without queue:
Order Service → HTTP → Email Service (must be up, must respond)

With queue:
Order Service → [order.placed] → Message Broker → Email Service (can be down, retries automatically)
                                                  → Inventory Service
                                                  → Analytics Service
\`\`\`

---

## Producer/Consumer Model

- **Producer**: sends messages to a queue/topic
- **Consumer**: reads and processes messages from a queue/topic
- **Broker**: the server that stores and routes messages (Kafka, RabbitMQ, SQS)

---

## Kafka Concepts

Kafka is a distributed streaming platform designed for high throughput and durability.

**Topic**: a named log of events. Like a table in a database, but append-only.

**Partition**: topics are split into partitions for parallelism. Each partition is an ordered, immutable log.

\`\`\`
Topic: order.placed
├── Partition 0: [msg1, msg3, msg5, ...]
├── Partition 1: [msg2, msg6, msg8, ...]
└── Partition 2: [msg4, msg7, msg9, ...]
\`\`\`

**Consumer Group**: multiple consumers sharing the load. Each partition is assigned to exactly one consumer in the group.

\`\`\`
Consumer Group: email-service
  Consumer 1 → Partition 0
  Consumer 2 → Partition 1
  Consumer 3 → Partition 2

Consumer Group: analytics-service (separate group, reads same topic independently)
  Consumer 1 → Partition 0, 1
  Consumer 2 → Partition 2
\`\`\`

**Offset**: each message in a partition has a sequential offset number. Consumers commit their offset, so they can resume after a crash.

---

## Delivery Guarantees

**At-most-once**: message is delivered 0 or 1 times. May be lost. Fast.

**At-least-once**: message is delivered 1 or more times. May be duplicated. This is Kafka's default.

\`\`\`js
// At-least-once requires idempotent consumers
async function processOrder(message) {
  const { orderId } = message;

  // Check if already processed
  const exists = await db.query('SELECT id FROM processed_orders WHERE id = ?', [orderId]);
  if (exists) return; // idempotency check

  await createOrder(orderId);
  await db.query('INSERT INTO processed_orders (id) VALUES (?)', [orderId]);
}
\`\`\`

**Exactly-once**: message is processed exactly once. Hardest to achieve. Kafka supports it with transactions, at higher complexity and cost.

---

## Dead Letter Queues

When a message fails to process after N retries, send it to a Dead Letter Queue (DLQ) instead of blocking the main consumer:

\`\`\`
Main Queue → Consumer fails 3 times → Dead Letter Queue
                                       ↓
                                   Manual review / alert / retry
\`\`\`

DLQs prevent poison messages (malformed or causing bugs) from blocking normal processing.

---

## Kafka vs RabbitMQ vs SQS

| | Kafka | RabbitMQ | AWS SQS |
|---|---|---|---|
| Model | Log-based (consumers pull) | Broker-based (push) | Managed queue (pull) |
| Throughput | Very high (millions/sec) | Medium | High |
| Message retention | Days/weeks (configurable) | Until consumed | Up to 14 days |
| Message ordering | Per-partition | Per-queue | Best effort (FIFO queue for strict order) |
| Replay | Yes (rewind offset) | No | No |
| Ops complexity | High (self-managed) | Medium | Low (managed) |

**When to use Kafka**: event streaming, audit logs, high throughput, need replay capability (ML pipelines, analytics)

**When to use RabbitMQ**: complex routing, multiple queues with different consumers, traditional task queue

**When to use SQS**: AWS stack, simple reliable queue, don't want to manage infrastructure

---

## Basic Kafka Producer/Consumer (Node.js)

\`\`\`js
const { Kafka } = require('kafkajs');

const kafka = new Kafka({ brokers: ['localhost:9092'] });

// Producer
const producer = kafka.producer();
await producer.connect();
await producer.send({
  topic: 'order.placed',
  messages: [{ key: orderId, value: JSON.stringify({ orderId, userId, total }) }],
});

// Consumer
const consumer = kafka.consumer({ groupId: 'email-service' });
await consumer.connect();
await consumer.subscribe({ topic: 'order.placed', fromBeginning: false });

await consumer.run({
  eachMessage: async ({ message }) => {
    const order = JSON.parse(message.value.toString());
    await sendConfirmationEmail(order.userId, order.orderId);
  },
});
\`\`\`

---

## Interview Key Points

- **Decouple services**: producers don't need to know about consumers
- **Load leveling**: queue absorbs traffic spikes, consumers process at their own rate
- **Kafka offsets** allow replay — you can reprocess historical events
- **At-least-once** is standard; make consumers **idempotent**
- **Partitioning** determines throughput and ordering granularity
    `.trim(),
  },

  {
    slug: 'orm-and-n-plus-1',
    title: 'ORMs and the N+1 Query Problem',
    track: 'backend',
    tags: ['orm', 'n+1', 'database', 'prisma', 'performance'],
    readingTime: 7,
    content: `
## ORMs and the N+1 Query Problem

ORMs make database access convenient, but they hide SQL and introduce performance traps. The N+1 problem is the most common one, and interviewers at product companies ask about it directly.

---

## What Is an ORM?

An Object-Relational Mapper lets you interact with a database using your programming language's objects instead of writing SQL.

\`\`\`js
// Without ORM (raw SQL)
const users = await db.query('SELECT * FROM users WHERE status = ?', ['active']);

// With ORM (Prisma)
const users = await prisma.user.findMany({
  where: { status: 'active' }
});
\`\`\`

Popular ORMs: **Prisma** (Node.js), **TypeORM** (Node.js), **Hibernate** (Java), **SQLAlchemy** (Python), **ActiveRecord** (Ruby on Rails).

---

## The N+1 Query Problem

This is the most important thing to understand about ORMs.

**Scenario**: Fetch 10 blog posts, then display each post's author name.

\`\`\`js
// With Prisma — looks innocent
const posts = await prisma.post.findMany(); // Query 1: SELECT * FROM posts

for (const post of posts) {
  const author = await prisma.user.findUnique({
    where: { id: post.authorId }
  });
  // Query 2, 3, 4... N+1: SELECT * FROM users WHERE id = ?
  console.log(post.title, author.name);
}
\`\`\`

**Result**: 1 query for posts + 10 queries for authors = **11 queries** for what should be 1.

If you have 100 posts, it's 101 queries. 1000 posts = 1001 queries. The name: you do N extra queries for N parent records.

---

## How to Fix N+1: Eager Loading

Tell the ORM to load the related data in the same query using a JOIN.

\`\`\`js
// Prisma — include related data
const posts = await prisma.post.findMany({
  include: { author: true } // JOIN in a single query
});

posts.forEach((post) => {
  console.log(post.title, post.author.name); // no extra queries
});
// Generates: SELECT posts.*, users.* FROM posts LEFT JOIN users ON posts.authorId = users.id
\`\`\`

\`\`\`js
// TypeORM
const posts = await postRepository.find({
  relations: ['author']
});

// Sequelize
const posts = await Post.findAll({
  include: [{ model: User, as: 'author' }]
});
\`\`\`

---

## The DataLoader Pattern (Batching)

When eager loading isn't possible (e.g., in GraphQL resolvers), use DataLoader to batch individual queries:

\`\`\`js
const DataLoader = require('dataloader');

// Instead of one query per user, batch all user IDs
const userLoader = new DataLoader(async (userIds) => {
  // ONE query for all IDs at once
  const users = await prisma.user.findMany({
    where: { id: { in: userIds } }
  });

  // Return in same order as input IDs
  return userIds.map((id) => users.find((u) => u.id === id));
});

// In GraphQL resolver — each call is batched automatically
const author = await userLoader.load(post.authorId);
\`\`\`

DataLoader collects all \`.load(id)\` calls within one tick, executes a single batched query, and distributes results.

---

## Lazy vs Eager Loading

**Lazy loading**: related data is loaded only when you access it — causes N+1.

**Eager loading**: related data is loaded upfront with a JOIN — solves N+1.

\`\`\`js
// Hibernate (Java) example — lazy loading default
@OneToMany(fetch = FetchType.LAZY)  // N+1 risk
List<Order> orders;

@OneToMany(fetch = FetchType.EAGER) // loads with JOIN, solves N+1
List<Order> orders;

// But eager loading everything can also be slow — load only what you need
\`\`\`

---

## When to Use Raw SQL vs ORM

**Use ORM for:**
- Standard CRUD operations
- Simple filtering, sorting, pagination
- Rapid development with automatic migrations
- Type-safe queries (Prisma's generated types)

**Use raw SQL for:**
- Complex analytics queries with CTEs, window functions
- Bulk operations (INSERT INTO ... SELECT)
- Queries the ORM generates inefficiently
- Performance-critical paths where you need full control

\`\`\`js
// Prisma raw query when needed
const result = await prisma.$queryRaw\`
  SELECT
    user_id,
    COUNT(*) as order_count,
    SUM(total) as revenue,
    RANK() OVER (ORDER BY SUM(total) DESC) as rank
  FROM orders
  WHERE created_at > NOW() - INTERVAL '30 days'
  GROUP BY user_id
  ORDER BY revenue DESC
  LIMIT 20
\`;
\`\`\`

---

## Query Optimization Checklist

- Use \`include\`/\`eager\` for relationships you'll access
- Log SQL in development to spot N+1 (\`DEBUG=prisma:query\` for Prisma)
- Select only the columns you need (\`select\` in Prisma, not \`SELECT *\`)
- Add indexes on foreign keys and frequently filtered columns
- Paginate large result sets — never fetch all rows
- Use \`EXPLAIN ANALYZE\` on slow queries to understand the plan

---

## Interview Summary

The N+1 problem is caused by lazy loading — fetching related records in a loop. Fix it with eager loading (JOIN), DataLoader (batching for GraphQL), or raw SQL for complex cases. Every ORM has this problem by default; knowing how to detect and fix it is what product companies care about.
    `.trim(),
  },
];

// ─── DEVOPS & DATA ANALYST ARTICLES ──────────────────────────────────────────
// 500-800 words each · Markdown content · For Indian engineers switching to product companies

const ARTICLES_DEVOPS_DA = [
  {
    slug: 'linux-command-line',
    title: 'Linux CLI Mastery: The Commands Every DevOps Engineer Uses Daily',
    category: 'devops',
    content: `## Why the CLI Matters

Every server you SSH into, every container you debug, every CI job that breaks — you fix it from the terminal. Product companies expect you to be fluent here, not fumbling.

## Navigation

\`\`\`bash
pwd                   # print working directory
cd /var/log           # absolute path
cd ..                 # one level up
cd ~                  # home directory
cd -                  # previous directory
ls -la                # all files, long format
ls -lh /etc           # human-readable sizes
\`\`\`

## File Operations

\`\`\`bash
mkdir -p /tmp/app/logs          # create nested dirs
touch app.log                   # create empty file
cp -r src/ backup/              # recursive copy
mv old-name.txt new-name.txt    # rename or move
rm -rf /tmp/old-build           # force delete directory
\`\`\`

## Viewing Files

\`\`\`bash
cat /etc/hosts                  # dump entire file
less /var/log/syslog            # paginate (q to quit, /term to search)
head -20 app.log                # first 20 lines
tail -100 app.log               # last 100 lines
tail -f app.log                 # follow live (Ctrl+C to stop)
\`\`\`

## Searching with grep

\`\`\`bash
grep "ERROR" app.log            # find ERROR in file
grep -i "error" app.log         # case-insensitive
grep -r "TODO" ./src            # recursive search in directory
grep -n "timeout" config.yaml   # show line numbers
grep -v "DEBUG" app.log         # invert - exclude DEBUG lines
grep -c "ERROR" app.log         # count matching lines
\`\`\`

## Finding Files with find

\`\`\`bash
find /etc -name "*.conf"              # by name pattern
find /var/log -type f -mtime -1       # files modified in last 1 day
find /tmp -type d -name "build*"      # directories matching pattern
find . -size +100M                    # files larger than 100MB
find . -name "*.log" -exec rm {} \\;   # delete all .log files
\`\`\`

## Text Processing

\`\`\`bash
# awk - column extraction
awk '{print $1, $4}' access.log          # print columns 1 and 4
awk -F: '{print $1}' /etc/passwd         # colon-delimited, first field

# sed - stream editing
sed 's/foo/bar/g' file.txt               # replace all foo with bar
sed -i 's/localhost/prod-db/g' config    # in-place edit

# cut - extract fields
cut -d: -f1 /etc/passwd                  # users list

# sort and uniq
sort -n numbers.txt                      # numeric sort
sort app.log | uniq -c | sort -rn        # count unique lines, top first

# wc - count lines/words/bytes
wc -l app.log                            # line count
\`\`\`

## Pipes and Redirection

\`\`\`bash
ls -la | grep ".conf"             # pipe output to grep
cat access.log | awk '{print $1}' | sort | uniq -c | sort -rn
echo "hello" > file.txt           # overwrite
echo "world" >> file.txt          # append
command 2>&1 | tee output.log     # stderr+stdout to file and screen
command > /dev/null 2>&1          # silence everything
\`\`\`

## 10 Practical One-Liners

\`\`\`bash
# 1. Find top 10 largest files in current directory
du -sh * | sort -rh | head -10

# 2. Count ERROR occurrences per hour in a log
grep "ERROR" app.log | awk '{print $2}' | cut -d: -f1 | sort | uniq -c

# 3. Find which process is using port 8080
lsof -i :8080

# 4. Watch disk usage update every 2 seconds
watch -n 2 df -h

# 5. Extract unique IP addresses from access log
awk '{print $1}' /var/log/nginx/access.log | sort -u

# 6. Find files modified in last 24 hours
find /app -type f -mtime -1 -ls

# 7. Kill all processes matching a name
pkill -f "python worker.py"

# 8. Show real-time CPU/memory per process
top -b -n 1 | head -20

# 9. Check if a remote port is open
nc -zv db.internal 5432

# 10. Archive and compress a directory
tar -czvf backup-$(date +%Y%m%d).tar.gz /var/app/data
\`\`\`

## What to Practice Next

Run these against real log files. Spin up a Linux VM or use WSL. The best way to get fluent is to replace every GUI action with a CLI equivalent for two weeks.`
  },

  {
    slug: 'linux-filesystem-hierarchy',
    title: 'Linux Filesystem Hierarchy: What Every Directory Does',
    category: 'devops',
    content: `## Everything is a File

Linux uses a single-root tree starting at \`/\`. There are no drive letters. Every device, process, and config is represented as a file somewhere in this tree. Understanding where things live saves you hours of debugging.

## The Root and Essential Binaries

**/bin** - Essential user binaries: \`ls\`, \`cp\`, \`mv\`, \`bash\`, \`cat\`. Available to all users, needed even in single-user mode.

**/sbin** - System binaries for root/admin tasks: \`fsck\`, \`ifconfig\`, \`reboot\`, \`iptables\`.

**/usr** - Secondary hierarchy for user programs:
- \`/usr/bin\` - most user commands (\`git\`, \`python3\`, \`curl\`)
- \`/usr/sbin\` - non-essential system binaries
- \`/usr/local/bin\` - software you installed manually (not via package manager)
- \`/usr/lib\` - shared libraries

On modern systems, \`/bin\` is often a symlink to \`/usr/bin\`.

## Configuration: /etc

\`\`\`bash
/etc/hosts            # static hostname to IP mappings
/etc/resolv.conf      # DNS resolver config
/etc/passwd           # user accounts (no actual passwords)
/etc/shadow           # hashed passwords (root-readable only)
/etc/fstab            # filesystems to mount at boot
/etc/ssh/sshd_config  # SSH daemon configuration
/etc/nginx/           # nginx config directory
/etc/systemd/         # systemd unit files
/etc/cron.d/          # cron job definitions
\`\`\`

Rule: if it configures a service, it lives under \`/etc\`.

## Variable Data: /var

\`\`\`bash
/var/log/           # all system and application logs
/var/log/syslog     # general system log (Debian/Ubuntu)
/var/log/messages   # general system log (RHEL/CentOS)
/var/log/nginx/     # nginx access and error logs
/var/log/auth.log   # SSH logins, sudo usage
/var/spool/         # queued data (print jobs, mail)
/var/lib/           # persistent app state (e.g., /var/lib/postgresql)
\`\`\`

When an app is misbehaving, \`/var/log\` is your first stop.

## Temporary Files: /tmp and /run

**/tmp** - Cleared on reboot. Use for scratch space in scripts.

**/run** - Runtime data for the current boot: PID files, sockets. \`/run/nginx.pid\` tells you the nginx process ID.

## User Home Directories

**/home** - One subdirectory per user: \`/home/ubuntu\`, \`/home/deploy\`. User configs live here as dotfiles (\`~/.bashrc\`, \`~/.ssh/\`).

**/root** - Home directory for the root user. Kept separate from \`/home\`.

## Virtual Filesystems: /proc and /sys

These don't exist on disk - the kernel generates them on the fly.

\`\`\`bash
cat /proc/cpuinfo           # CPU details
cat /proc/meminfo           # memory stats
cat /proc/1/cmdline         # command that started PID 1
ls /proc/$(pgrep nginx)/fd  # open file descriptors of nginx
\`\`\`

## Devices: /dev

\`\`\`bash
/dev/sda        # first SATA disk
/dev/sda1       # first partition
/dev/null       # discard anything written here
/dev/zero       # infinite stream of null bytes
/dev/random     # random bytes (used for crypto)
/dev/tty        # current terminal
\`\`\`

## Mount Points: /mnt and /media

**/mnt** - Temporary mount point for manual mounts (NFS shares, external disks during maintenance).

**/media** - Auto-mounted removable media (USB drives, CD-ROMs).

\`\`\`bash
mount /dev/sdb1 /mnt/backup     # manually mount a disk
umount /mnt/backup              # unmount it
df -h                           # see all mounted filesystems
\`\`\`

## Where to Install Software

| Source | Location |
|--------|----------|
| Package manager (apt/yum) | \`/usr/bin\`, \`/usr/lib\` |
| Manual/custom install | \`/usr/local/bin\` |
| Company-internal tools | \`/opt/toolname/\` |
| Scripts for all users | \`/usr/local/bin\` |

## Quick Reference

\`\`\`bash
# Logs      -> /var/log/
# Configs   -> /etc/
# Binaries  -> /usr/bin/, /usr/local/bin/
# Home dirs -> /home/username/
# Temp      -> /tmp/
# Devices   -> /dev/
# Kernel    -> /proc/, /sys/
\`\`\``
  },

  {
    slug: 'linux-file-permissions',
    title: 'Linux File Permissions: chmod, chown, and ACLs',
    category: 'devops',
    content: `## The Permission Model

Every file and directory has three permission sets: **owner (user)**, **group**, and **others**. Each set has three bits: **read (r)**, **write (w)**, **execute (x)**.

\`\`\`bash
ls -la /etc/nginx/nginx.conf
# -rw-r--r-- 1 root root 2458 Jan 10 09:00 nginx.conf
#  ^ ^^^ ^^^ ^^^^ ^^^^
#  | u   g   o    owner group
#  file type (- = file, d = directory, l = symlink)
\`\`\`

## Reading Permissions

| Symbol | Meaning |
|--------|---------|
| \`r\` | Read file / list directory |
| \`w\` | Write/modify file / create files in directory |
| \`x\` | Execute file / enter directory |
| \`-\` | Permission not set |

## Numeric (Octal) Notation

Each permission bit has a value: r=4, w=2, x=1. Sum them per set.

\`\`\`
rwx = 4+2+1 = 7
rw- = 4+2+0 = 6
r-x = 4+0+1 = 5
r-- = 4+0+0 = 4
--- = 0
\`\`\`

Common permission values:

\`\`\`bash
755   # rwxr-xr-x - directories, executables
644   # rw-r--r-- - regular files, configs
600   # rw------- - private keys, secrets
777   # rwxrwxrwx - DO NOT use in production
700   # rwx------ - private directories
\`\`\`

## chmod

\`\`\`bash
# Numeric
chmod 644 config.yaml
chmod 755 /usr/local/bin/myscript
chmod -R 755 /var/www/html      # recursive

# Symbolic
chmod u+x script.sh             # add execute for owner
chmod g-w sensitive.txt         # remove write from group
chmod o-rwx private/            # remove all perms from others
chmod a+r public.html           # add read for all (a = all)
chmod u=rw,g=r,o= file.txt      # set exact permissions
\`\`\`

## chown and chgrp

\`\`\`bash
chown ubuntu file.txt               # change owner
chown ubuntu:www-data file.txt      # change owner and group
chown -R www-data:www-data /var/www # recursive
chgrp developers project/           # change group only
\`\`\`

## Practical Permission Guide

\`\`\`bash
# Web server files
chmod 644 /var/www/html/*.html   # readable by nginx/apache
chmod 755 /var/www/html/         # directories must be executable

# SSH keys - wrong perms = SSH refuses to use them
chmod 700 ~/.ssh/
chmod 600 ~/.ssh/id_rsa          # private key
chmod 644 ~/.ssh/id_rsa.pub      # public key
chmod 600 ~/.ssh/authorized_keys

# Application configs with secrets
chmod 640 /etc/app/config.yaml   # owner rw, group r, others nothing
chown root:appuser /etc/app/config.yaml

# Scripts
chmod 755 /usr/local/bin/deploy.sh
\`\`\`

## Special Bits: setuid, setgid, sticky

**setuid (4xxx)** - When set on an executable, it runs as the file's owner, not the calling user.

\`\`\`bash
ls -la /usr/bin/passwd
# -rwsr-xr-x root root  # 's' = setuid - runs as root
chmod u+s /usr/local/bin/special   # set setuid
chmod 4755 /usr/local/bin/special  # numeric equivalent
\`\`\`

**setgid (2xxx)** - On directories, new files inherit the directory's group.

\`\`\`bash
chmod g+s /var/shared/
chmod 2775 /var/shared/
\`\`\`

**sticky bit (1xxx)** - On directories like \`/tmp\`, only the owner can delete their own files.

\`\`\`bash
ls -la /tmp
# drwxrwxrwt  # 't' = sticky bit
chmod +t /shared/uploads/
chmod 1777 /shared/uploads/
\`\`\`

## umask

umask sets default permissions for newly created files by subtracting from 666 (files) or 777 (directories).

\`\`\`bash
umask           # show current (typically 022)
# 022 means: new files = 666-022 = 644, dirs = 777-022 = 755

umask 027       # new files = 640, dirs = 750
# Good for app servers - group can read, others get nothing
\`\`\`

Set in \`/etc/profile\` or \`~/.bashrc\` to persist.

## Auditing Permissions

\`\`\`bash
# Test your own access
test -r file && echo readable
test -w file && echo writable

# Find world-writable files (security audit)
find /etc -perm -o+w -type f

# Find setuid files
find / -perm -4000 -type f 2>/dev/null
\`\`\``
  },

  {
    slug: 'bash-scripting-guide',
    title: 'Bash Scripting: Automate Everything on Linux',
    category: 'devops',
    content: `## Why Bash Scripting

Bash scripts automate repetitive DevOps tasks: deployments, health checks, backups, log rotation. Any sequence of commands you run more than twice should be a script.

## Script Structure

\`\`\`bash
#!/usr/bin/env bash
# ^^^ shebang line - always first, tells OS to use bash

set -euo pipefail
# -e  exit immediately on error
# -u  treat unset variables as errors
# -o pipefail  catch errors in pipes

echo "Script started"
\`\`\`

Always use \`set -euo pipefail\` - it catches bugs that would otherwise silently fail.

## Variables

\`\`\`bash
NAME="production"
PORT=8080
LOG_DIR="/var/log/app"

echo "Deploying to $NAME on port $PORT"
echo "Logs at \${LOG_DIR}/app.log"   # braces when adjacent to text

# Command substitution
TODAY=$(date +%Y-%m-%d)
FILE_COUNT=$(ls /var/log | wc -l)

# Read-only
readonly MAX_RETRIES=3
\`\`\`

## Reading Input

\`\`\`bash
read -p "Enter environment (dev/prod): " ENV
read -s -p "Enter password: " PASS   # -s = silent (no echo)
echo ""
\`\`\`

## Conditionals

\`\`\`bash
if [[ -f "/etc/app/config.yaml" ]]; then
  echo "Config exists"
elif [[ -d "/etc/app" ]]; then
  echo "Dir exists but no config"
else
  echo "Nothing found"
fi

# Common test operators:
# -f  file exists and is a regular file
# -d  directory exists
# -z  string is empty
# -n  string is not empty
# -eq -ne -lt -gt  numeric comparisons
# == !=  string comparisons inside [[ ]]

if [[ -z "$API_KEY" ]]; then
  echo "ERROR: API_KEY not set" >&2
  exit 1
fi
\`\`\`

## Loops

\`\`\`bash
# for over list
for SERVER in web1 web2 web3; do
  ssh deploy@$SERVER "systemctl restart app"
done

# for over files
for FILE in /var/log/*.log; do
  gzip "$FILE"
done

# while loop with retry
RETRIES=0
while [[ $RETRIES -lt 3 ]]; do
  curl -sf http://localhost:8080/health && break
  RETRIES=$((RETRIES + 1))
  sleep 5
done

# until loop
until pg_isready -h localhost; do
  sleep 2
done
\`\`\`

## Functions

\`\`\`bash
log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"
}

die() {
  echo "ERROR: $*" >&2
  exit 1
}

check_dependency() {
  local cmd=$1
  command -v "$cmd" &>/dev/null || die "$cmd not installed"
}

check_dependency docker
check_dependency kubectl
log "Dependencies OK"
\`\`\`

## Positional Parameters and Arrays

\`\`\`bash
# $0=script, $1=first arg, $2=second arg, $@=all args, $#=count
[[ $# -lt 2 ]] && die "Usage: $0 <env> <version>"
ENV=$1
VERSION=$2

# Arrays
SERVERS=("web1" "web2" "web3")
echo "\${SERVERS[0]}"         # first element
echo "\${#SERVERS[@]}"        # array length
for S in "\${SERVERS[@]}"; do echo "$S"; done
\`\`\`

## Error Handling with trap

\`\`\`bash
cleanup() {
  echo "Cleaning up..."
  rm -rf /tmp/deploy-$$
}

trap cleanup EXIT
trap 'die "Interrupted"' INT TERM
\`\`\`

## Practical Example: Health Check Script

\`\`\`bash
#!/usr/bin/env bash
set -euo pipefail

URL="\${1:-http://localhost:8080/health}"
MAX_WAIT=60
INTERVAL=5
elapsed=0

log() { echo "[$(date '+%H:%M:%S')] $*"; }

log "Waiting for $URL..."

while true; do
  if curl -sf --max-time 3 "$URL" > /dev/null; then
    log "Service is healthy!"
    exit 0
  fi
  if [[ $elapsed -ge $MAX_WAIT ]]; then
    log "ERROR: Not healthy after \${MAX_WAIT}s"
    exit 1
  fi
  log "Not ready. Retrying in \${INTERVAL}s..."
  sleep $INTERVAL
  elapsed=$((elapsed + INTERVAL))
done
\`\`\`

## Practical Example: Backup Script

\`\`\`bash
#!/usr/bin/env bash
set -euo pipefail

SOURCE_DIR="\${1:?Usage: $0 <source_dir>}"
BACKUP_DIR="/var/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/backup_$TIMESTAMP.tar.gz"

mkdir -p "$BACKUP_DIR"
tar -czf "$BACKUP_FILE" "$SOURCE_DIR"
echo "Created: $BACKUP_FILE"

# Keep only last 7 backups
ls -t "$BACKUP_DIR"/backup_*.tar.gz | tail -n +8 | xargs -r rm
\`\`\``
  },

  {
    slug: 'ssh-guide',
    title: 'SSH: Key-Based Auth, Port Forwarding & Config File',
    category: 'devops',
    content: `## How SSH Works

SSH uses asymmetric cryptography. You have a **private key** (never leaves your machine) and a **public key** (placed on every server you want to access). The server challenges you to prove you hold the private key without ever seeing it.

Password-based SSH still works but product companies disable it. Key-based auth is the standard.

## Generating SSH Keys

\`\`\`bash
ssh-keygen -t ed25519 -C "you@company.com"
# Creates ~/.ssh/id_ed25519 (private) and ~/.ssh/id_ed25519.pub (public)

# RSA for older systems
ssh-keygen -t rsa -b 4096 -C "you@company.com"

# Named key for a specific server
ssh-keygen -t ed25519 -f ~/.ssh/prod_server -C "prod key"
\`\`\`

Never share \`id_ed25519\` (no .pub extension). That is your private key.

## Copying Your Public Key to a Server

\`\`\`bash
ssh-copy-id -i ~/.ssh/id_ed25519.pub user@server-ip

# Manual method
cat ~/.ssh/id_ed25519.pub | ssh user@server "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"

# Fix permissions on server
ssh user@server "chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys"
\`\`\`

## The ~/.ssh/config File

Stop typing long ssh commands. Define everything in \`~/.ssh/config\`:

\`\`\`
Host prod-web
    HostName 10.0.1.50
    User ubuntu
    IdentityFile ~/.ssh/prod_server

Host bastion
    HostName bastion.company.com
    User ec2-user
    IdentityFile ~/.ssh/bastion_key

# Jump through bastion to reach internal servers
Host internal-db
    HostName 10.0.2.100
    User ubuntu
    IdentityFile ~/.ssh/prod_server
    ProxyJump bastion

Host dev-*
    User developer
    IdentityFile ~/.ssh/dev_key
    StrictHostKeyChecking no
\`\`\`

Now you run \`ssh prod-web\` instead of \`ssh -i ~/.ssh/prod_server ubuntu@10.0.1.50\`.

## Port Forwarding

### Local Port Forwarding (-L)

Access a remote database as if it's local:

\`\`\`bash
ssh -L 5432:db.internal:5432 bastion
psql -h localhost -p 5432 -U postgres mydb
\`\`\`

### Remote Port Forwarding (-R)

Expose a local port on the remote server:

\`\`\`bash
ssh -R 8080:localhost:3000 prod-server
# prod-server:8080 now forwards to your local :3000
\`\`\`

### Dynamic Port Forwarding (-D) - SOCKS Proxy

\`\`\`bash
ssh -D 1080 bastion
# Configure browser SOCKS5 proxy: localhost:1080
# All browser traffic routes through bastion
\`\`\`

## SSH Agent

Holds your decrypted private key in memory so you skip passphrase entry on every connection:

\`\`\`bash
eval $(ssh-agent)
ssh-add ~/.ssh/id_ed25519
ssh-add -l                  # list loaded keys

# Enable agent forwarding (SSH further from bastion without copying keys there)
Host bastion
    ForwardAgent yes
\`\`\`

## Transferring Files

\`\`\`bash
# SCP
scp file.txt ubuntu@prod-web:/tmp/
scp -r ./dist ubuntu@prod-web:/var/www/app/

# rsync - efficient, transfers only changed bytes
rsync -avz ./dist/ ubuntu@prod-web:/var/www/app/
rsync -avz --delete ./dist/ ubuntu@prod-web:/var/www/app/   # exact mirror
\`\`\`

## Hardening sshd

\`\`\`bash
# /etc/ssh/sshd_config
PasswordAuthentication no
PermitRootLogin no
AllowUsers ubuntu deploy
MaxAuthTries 3

systemctl reload sshd
\`\`\`

## Troubleshooting

\`\`\`bash
ssh -v user@server      # verbose - see exactly where it fails
ssh -vvv user@server    # very verbose

# Common "Permission denied" causes:
# 1. Wrong IdentityFile in config
# 2. Public key not in server's authorized_keys
# 3. Wrong permissions: ~/.ssh (700), authorized_keys (600)
# 4. Wrong username
\`\`\``
  },

  {
    slug: 'networking-fundamentals-devops',
    title: 'Networking Fundamentals for DevOps Engineers',
    category: 'devops',
    content: `## The OSI Model (Practical Layers)

Skip the full 7-layer theory. Focus on what you troubleshoot daily:

| Layer | Name | Protocols | What breaks here |
|-------|------|-----------|-----------------|
| L3 | Network | IP, ICMP | Routing, wrong subnet, firewall |
| L4 | Transport | TCP, UDP | Port blocked, connection refused |
| L7 | Application | HTTP, DNS, gRPC | App errors, TLS, timeouts |

## IP Addressing and CIDR

\`\`\`
192.168.1.0/24   - 256 addresses, subnet mask 255.255.255.0
10.0.0.0/16      - 65,536 addresses (larger VPC subnets)
10.0.1.0/24      - one subnet within a /16
172.16.0.0/12    - private range used by Docker
\`\`\`

CIDR /24 means the first 24 bits are fixed, the last 8 bits are variable (0-255).

\`\`\`bash
ip addr show
ip route show        # routing table
\`\`\`

## TCP vs UDP

**TCP** - Reliable, ordered, connection-oriented (SYN/SYN-ACK/ACK handshake). Use for HTTP, databases, SSH - anything where data loss is unacceptable.

**UDP** - Fire and forget. Faster, no guarantee. Use for DNS, video streaming, metrics (StatsD), VPNs.

## DNS Resolution Step by Step

1. Browser checks local cache
2. OS checks \`/etc/hosts\`
3. Query sent to resolver (ISP or 8.8.8.8)
4. Resolver checks its cache
5. If not cached: asks root nameserver, gets TLD server address
6. Asks TLD server (.com), gets authoritative nameserver
7. Asks authoritative nameserver, gets actual IP
8. Returns IP, caches with TTL

\`\`\`bash
nslookup api.github.com
dig api.github.com
dig api.github.com +trace    # full resolution chain
dig @8.8.8.8 api.github.com  # use specific resolver
\`\`\`

## Common Ports to Memorize

| Port | Service |
|------|---------|
| 22 | SSH |
| 80 | HTTP |
| 443 | HTTPS |
| 3306 | MySQL |
| 5432 | PostgreSQL |
| 6379 | Redis |
| 9092 | Kafka |
| 27017 | MongoDB |

## HTTP vs HTTPS - TLS Briefly

HTTPS = HTTP over TLS. TLS handshake before any HTTP data:
1. Client sends supported TLS versions and ciphers
2. Server returns certificate (contains public key)
3. Client verifies certificate against trusted CA
4. Both derive session keys via Diffie-Hellman key exchange
5. Encrypted HTTP begins

\`\`\`bash
# Check certificate expiry
openssl s_client -connect api.example.com:443 </dev/null 2>/dev/null \\
  | openssl x509 -noout -dates
\`\`\`

## Troubleshooting Toolkit

\`\`\`bash
# Reachability (ICMP)
ping -c 4 db.internal

# Path traffic takes
traceroute db.internal

# Port check
nc -zv db.internal 5432        # TCP
nc -zuv metrics.internal 8125  # UDP

# HTTP details
curl -v http://api.example.com/health
curl -w "\\nTime: %{time_total}s\\n" -o /dev/null -s https://api.example.com

# Active ports and connections
ss -tlnp            # listening TCP ports with process names
ss -tunp            # all TCP/UDP connections

# Packet capture (requires root)
tcpdump -i eth0 port 80 -n
tcpdump -i any host 10.0.1.50 -n -w capture.pcap
\`\`\`

## Firewall Basics

\`\`\`bash
# iptables
iptables -L -n -v
iptables -A INPUT -p tcp --dport 80 -j ACCEPT

# ufw (Ubuntu-friendly)
ufw status
ufw allow 443/tcp
ufw deny 23/tcp
\`\`\`

## Subnet Math

A /24 gives 256 addresses. In AWS, 5 are reserved (.0 network, .1 gateway, .2 DNS, .3 reserved, .255 broadcast), leaving 251 usable IPs. Account for this when planning VPC subnets.`
  },

  {
    slug: 'docker-containers-guide',
    title: 'Docker: Containers, Images & Dockerfile Best Practices',
    category: 'devops',
    content: `## Containers vs VMs

A VM emulates hardware and runs a full OS kernel. A container shares the host kernel and isolates only the process namespace, filesystem, and network. Containers start in milliseconds (vs minutes for VMs) and use megabytes of RAM (vs gigabytes).

## Docker Architecture

- **Daemon** (\`dockerd\`) - background service managing containers and images
- **CLI** (\`docker\`) - client that talks to daemon via REST API
- **Registry** - stores images (Docker Hub, ECR, GCR, private)
- **Image** - read-only template (like a class)
- **Container** - running instance of an image (like an object)

## Essential Commands

\`\`\`bash
# Images
docker images
docker pull nginx:1.25
docker rmi nginx:1.25
docker image prune -a         # remove unused images

# Containers
docker run -d -p 8080:80 --name web nginx:1.25
docker run -it ubuntu:22.04 bash
docker ps                     # running containers
docker ps -a                  # all containers
docker stop web && docker rm web
docker logs web -f
docker exec -it web bash
docker inspect web

# Build
docker build -t myapp:v1.0 .
docker build -t myapp:v1.0 -f docker/Dockerfile .
\`\`\`

## Writing a Dockerfile

\`\`\`dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy dependency files first (layer caching optimization)
COPY package*.json ./
RUN npm ci --only=production

COPY src/ ./src/

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

CMD ["node", "src/index.js"]
\`\`\`

Be specific with image tags. Never use \`:latest\` in production.

### CMD vs ENTRYPOINT

\`\`\`dockerfile
ENTRYPOINT ["node"]       # fixed executable, not overridable without --entrypoint
CMD ["src/index.js"]      # default argument, overridable at runtime

# docker run myapp src/worker.js  ->  runs: node src/worker.js
\`\`\`

## Multi-Stage Builds

Build in one stage, copy only the artifact to a lean final image:

\`\`\`dockerfile
FROM node:20 AS builder
WORKDIR /build
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Final image has no source, no dev deps, no build tools
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /build/dist ./dist
COPY --from=builder /build/node_modules ./node_modules
CMD ["node", "dist/index.js"]
\`\`\`

## .dockerignore

Always create this to keep secrets and junk out of your image:

\`\`\`
node_modules
.git
.env
*.log
coverage/
.DS_Store
docker-compose*.yml
\`\`\`

## Layer Caching - Order Matters

Docker caches each layer. A change invalidates all subsequent layers:

\`\`\`dockerfile
# WRONG - code change invalidates npm install cache
COPY . .
RUN npm ci

# CORRECT - only code changes invalidate the app layer
COPY package*.json ./
RUN npm ci
COPY . .
\`\`\`

## Docker Networking

\`\`\`bash
docker network ls

# bridge network - containers reach each other by name
docker network create app-network
docker run -d --name db --network app-network postgres:15
docker run -d --name web --network app-network myapp
# web reaches db at hostname "db"

# host - use host network directly (Linux only)
docker run --network host nginx

# none - no network
docker run --network none myapp
\`\`\`

## Volumes for Persistent Data

\`\`\`bash
# Named volume (survives container deletion)
docker run -d -v postgres-data:/var/lib/postgresql/data postgres:15

# Bind mount (local dir into container, great for dev)
docker run -d -v $(pwd)/nginx.conf:/etc/nginx/nginx.conf nginx

docker volume ls
docker volume inspect postgres-data
\`\`\``
  },

  {
    slug: 'docker-compose-guide',
    title: 'Docker Compose: Multi-Container Applications',
    category: 'devops',
    content: `## What Docker Compose Solves

A real web app needs multiple services: app, database, cache, queue. Without Compose you'd run separate docker commands for each, manage networks manually, and likely forget a flag. Compose defines your entire stack in one YAML file and starts everything with one command.

## docker-compose.yml Structure

\`\`\`yaml
version: '3.9'

services:       # each container definition
  web:
    ...
  db:
    ...

volumes:        # named persistent volumes
  db-data:

networks:       # custom networks
  app-net:
\`\`\`

## Service Definition Options

\`\`\`yaml
services:
  api:
    build:
      context: .
      dockerfile: docker/Dockerfile
    ports:
      - "3000:3000"          # host:container
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgres://user:pass@db:5432/mydb
    env_file:
      - .env
    volumes:
      - ./config:/app/config:ro   # bind mount, read-only
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped
    networks:
      - app-net
\`\`\`

## Health Checks

\`\`\`yaml
services:
  db:
    image: postgres:15
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s

  redis:
    image: redis:7-alpine
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      retries: 3
\`\`\`

## Complete Example: Node.js + PostgreSQL + Redis

\`\`\`yaml
version: '3.9'

services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://appuser:secret@db:5432/appdb
      - REDIS_URL=redis://redis:6379
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy
    restart: unless-stopped
    networks:
      - app-net

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: appuser
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: appdb
    volumes:
      - postgres-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U appuser -d appdb"]
      interval: 10s
      retries: 5
    networks:
      - app-net

  redis:
    image: redis:7-alpine
    volumes:
      - redis-data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      retries: 3
    networks:
      - app-net

volumes:
  postgres-data:
  redis-data:

networks:
  app-net:
    driver: bridge
\`\`\`

Services communicate using the service name as hostname. Docker's internal DNS resolves \`db\` and \`redis\` automatically.

## Docker Compose Commands

\`\`\`bash
docker compose up -d              # start all services in background
docker compose up --build -d      # rebuild images then start
docker compose down               # stop and remove containers
docker compose down -v            # also remove volumes (wipes data)

docker compose ps
docker compose logs               # all service logs
docker compose logs -f api        # follow specific service
docker compose logs --tail=100 db

docker compose exec api bash
docker compose exec db psql -U appuser appdb

docker compose restart api
docker compose pull
docker compose config             # validate and view merged config
\`\`\`

## Common Patterns

### Environment-Specific Overrides

\`\`\`bash
# Base: docker-compose.yml
# Dev overrides: docker-compose.override.yml (auto-loaded)
# Prod overrides: docker-compose.prod.yml

docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
\`\`\`

### Scaling

\`\`\`bash
docker compose up -d --scale api=3
# Requires no static host port mapping on the scaled service
\`\`\`

### One-Off Commands

\`\`\`bash
docker compose run --rm api npm run migrate
docker compose run --rm api node scripts/seed.js
\`\`\``
  },

  {
    slug: 'kubernetes-architecture',
    title: 'Kubernetes Architecture: Nodes, Pods, Deployments & Services',
    category: 'devops',
    content: `## Why Kubernetes

Docker runs containers on one machine. Kubernetes runs containers across a cluster of machines, handles failures automatically, scales up/down, and rolls out updates without downtime. It is the de facto standard in product companies.

## Control Plane vs Worker Nodes

### Control Plane (the brain)

- **API Server** - single entry point for all kubectl commands and cluster operations
- **etcd** - distributed key-value store holding all cluster state. If etcd dies, the cluster dies.
- **Scheduler** - decides which node to run a new Pod on (based on resource availability, affinity rules)
- **Controller Manager** - runs control loops ensuring actual state matches desired state (e.g., keeps 3 replicas running)

### Worker Nodes (where your app runs)

- **kubelet** - agent on each node. Talks to API server, starts/stops containers
- **kube-proxy** - manages networking rules for Service routing
- **Container Runtime** - containerd or CRI-O

## Pod

The smallest deployable unit. One or more containers sharing network namespace and storage.

\`\`\`yaml
apiVersion: v1
kind: Pod
metadata:
  name: api-pod
spec:
  containers:
  - name: api
    image: myapp:v1.2
    ports:
    - containerPort: 3000
    resources:
      requests:
        memory: "128Mi"
        cpu: "100m"
      limits:
        memory: "256Mi"
        cpu: "500m"
\`\`\`

You rarely create Pods directly. Deployments manage them.

## Deployment

Describes desired state, creates a ReplicaSet, handles rolling updates.

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
      - name: api
        image: myapp:v1.2
        ports:
        - containerPort: 3000
\`\`\`

## Service

Stable network endpoint for a set of Pods. Pod IPs change; Service IP stays fixed.

\`\`\`yaml
apiVersion: v1
kind: Service
metadata:
  name: api-service
spec:
  selector:
    app: api
  ports:
  - port: 80
    targetPort: 3000
  type: ClusterIP       # internal only
  # NodePort      - accessible on each node's IP
  # LoadBalancer  - creates cloud load balancer
\`\`\`

## Ingress

Routes external HTTP/HTTPS traffic to internal Services. One LoadBalancer for all services.

\`\`\`yaml
spec:
  rules:
  - host: api.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: api-service
            port:
              number: 80
\`\`\`

## Namespace

Logical isolation within a cluster. Separate teams, environments, or applications.

\`\`\`bash
kubectl create namespace staging
kubectl get pods -n staging
\`\`\`

## Essential kubectl Commands

\`\`\`bash
# Get resources
kubectl get pods
kubectl get pods -n production -o wide
kubectl get deployments,services
kubectl get all

# Details and logs
kubectl describe pod api-pod-xyz
kubectl logs api-pod-xyz
kubectl logs -f api-pod-xyz
kubectl logs api-pod-xyz --previous   # logs from crashed container

# Apply and delete
kubectl apply -f deployment.yaml
kubectl delete -f deployment.yaml

# Debug
kubectl exec -it api-pod-xyz -- bash
kubectl port-forward pod/api-pod-xyz 8080:3000

# Rollouts
kubectl rollout status deployment/api
kubectl rollout history deployment/api
kubectl rollout undo deployment/api
kubectl set image deployment/api api=myapp:v1.3
\`\`\``
  },

  {
    slug: 'kubernetes-scaling',
    title: 'Kubernetes Scaling: HPA, VPA & Resource Management',
    category: 'devops',
    content: `## Why Resource Management Matters

Without resource limits, one misbehaving Pod can consume all CPU/memory on a node and starve every other Pod on it. Kubernetes uses requests and limits to prevent this and to make scheduling decisions.

## Requests vs Limits

\`\`\`yaml
resources:
  requests:
    memory: "128Mi"   # scheduler reserves this on a node
    cpu: "100m"       # 100 millicores = 0.1 CPU core
  limits:
    memory: "256Mi"   # Pod is OOMKilled if it exceeds this
    cpu: "500m"       # Pod is CPU-throttled (not killed) if exceeded
\`\`\`

**Requests** - what the scheduler uses to find a node with enough space.
**Limits** - hard ceiling. Exceed memory = OOMKilled. Exceed CPU = throttled.

## QoS Classes

| QoS Class | Condition | Eviction Priority |
|-----------|-----------|-------------------|
| **Guaranteed** | requests == limits for all containers | Last evicted |
| **Burstable** | requests set, limits higher | Middle |
| **BestEffort** | no requests or limits set | First evicted |

Set requests and limits for all production workloads. BestEffort Pods are the first casualties when a node runs out of memory.

## Horizontal Pod Autoscaler (HPA)

Scales the number of replicas based on CPU, memory, or custom metrics.

\`\`\`yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: api-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: api
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70    # scale up when avg CPU > 70%
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
\`\`\`

\`\`\`bash
kubectl get hpa
kubectl describe hpa api-hpa    # see current metrics and scaling events
\`\`\`

HPA requires metrics-server installed in the cluster. Custom metrics (RPS, queue depth) require Prometheus Adapter or KEDA.

## Vertical Pod Autoscaler (VPA)

Adjusts the CPU and memory requests/limits based on actual usage. Useful when you don't know the right values upfront.

\`\`\`yaml
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: api-vpa
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: api
  updatePolicy:
    updateMode: "Off"    # "Off" = only recommend, don't change
    # "Auto" = restart pods with new values automatically
\`\`\`

Run VPA in "Off" mode first to get recommendations, then manually tune your requests/limits.

## Cluster Autoscaler

Adds or removes nodes when Pods can't be scheduled (scale up) or nodes are underutilized (scale down). Works with EKS, GKE, AKS. Configure once at the cluster level - it runs automatically.

## Node Affinity - Attract Pods to Specific Nodes

\`\`\`yaml
affinity:
  nodeAffinity:
    requiredDuringSchedulingIgnoredDuringExecution:
      nodeSelectorTerms:
      - matchExpressions:
        - key: instance-type
          operator: In
          values: ["m5.large", "m5.xlarge"]
\`\`\`

## Taints and Tolerations

**Taints** - repel Pods from nodes (e.g., reserve a node for GPU workloads):

\`\`\`bash
kubectl taint nodes gpu-node-1 dedicated=gpu:NoSchedule
\`\`\`

**Tolerations** - allow a Pod to run on a tainted node:

\`\`\`yaml
tolerations:
- key: "dedicated"
  operator: "Equal"
  value: "gpu"
  effect: "NoSchedule"
\`\`\`

## PodDisruptionBudget (PDB)

Ensures minimum availability during voluntary disruptions (node drains, rolling updates):

\`\`\`yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: api-pdb
spec:
  minAvailable: 2     # always keep at least 2 Pods running
  selector:
    matchLabels:
      app: api
\`\`\`

Without a PDB, a node drain could take down all your Pods at once. With it, Kubernetes waits for a replacement before evicting another.`
  },

  {
    slug: 'terraform-introduction',
    title: 'Terraform: Infrastructure as Code from Scratch',
    category: 'devops',
    content: `## What is Infrastructure as Code

Before IaC, engineers clicked through cloud consoles to create servers. When something broke, nobody knew what the exact config was. IaC means your infrastructure is code - versioned in git, reviewed in PRs, reproducible, and auditable.

Terraform is the most widely used IaC tool, working with AWS, GCP, Azure, and 1000+ providers.

## The Terraform Workflow

\`\`\`bash
terraform init      # download providers, set up backend
terraform plan      # show what will change (dry run)
terraform apply     # make the changes
terraform destroy   # tear everything down
\`\`\`

Never run \`apply\` without reading \`plan\` output first.

## HCL Syntax

### Provider Configuration

\`\`\`hcl
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "ap-south-1"
}
\`\`\`

### Resources

\`\`\`hcl
resource "aws_instance" "web" {
  ami           = "ami-0f5ee92e2d63afc18"
  instance_type = "t3.micro"

  tags = {
    Name        = "web-server"
    Environment = var.environment
  }
}
\`\`\`

### Variables and Outputs

\`\`\`hcl
variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "dev"
}

output "instance_public_ip" {
  value = aws_instance.web.public_ip
}
\`\`\`

Pass values via \`terraform.tfvars\`:

\`\`\`hcl
environment = "production"
\`\`\`

### Data Sources

Read existing resources without managing them:

\`\`\`hcl
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]   # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }
}

resource "aws_instance" "web" {
  ami = data.aws_ami.ubuntu.id
}
\`\`\`

## The State File

Terraform tracks what it created in \`terraform.tfstate\`. This is how it knows what to update vs create vs delete.

Never edit state manually. Never commit it to git (it may contain secrets).

### Remote State for Teams

\`\`\`hcl
terraform {
  backend "s3" {
    bucket         = "mycompany-terraform-state"
    key            = "production/api/terraform.tfstate"
    region         = "ap-south-1"
    dynamodb_table = "terraform-state-lock"   # prevents concurrent applies
    encrypt        = true
  }
}
\`\`\`

## Reading Plan Output

\`\`\`
+ create          # new resource
~ update          # change in-place
- destroy         # will be deleted
-/+ destroy and recreate  # requires replacement (e.g., changing AMI)
\`\`\`

Pay attention to \`-/+\` - it means downtime if you're changing a running server.

## Importing Existing Resources

Someone created a resource manually in AWS? Import it:

\`\`\`bash
terraform import aws_instance.web i-0123456789abcdef0
\`\`\`

Then write the matching HCL so Terraform manages it going forward.

## Complete Example: EC2 + Security Group

\`\`\`hcl
resource "aws_security_group" "web_sg" {
  name = "web-sg-\${var.environment}"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/8"]   # internal only
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "web" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = "t3.micro"
  vpc_security_group_ids = [aws_security_group.web_sg.id]

  tags = {
    Name = "web-\${var.environment}"
  }
}
\`\`\``
  },

  {
    slug: 'github-actions-cicd',
    title: 'GitHub Actions: Build Your First CI/CD Pipeline',
    category: 'devops',
    content: `## What CI/CD Means

**Continuous Integration (CI)** - every code push automatically runs tests and builds. Catch bugs in minutes.

**Continuous Deployment (CD)** - passing builds are automatically deployed. No manual steps, no "works on my machine."

GitHub Actions is GitHub's built-in CI/CD - no separate Jenkins or CircleCI needed.

## Core Concepts

- **Workflow** - a YAML file in \`.github/workflows/\`. Can have multiple per repo.
- **Event** - what triggers the workflow (push, pull_request, schedule, manual).
- **Job** - a set of steps on one runner. Jobs run in parallel by default.
- **Step** - a single command or reusable Action.
- **Runner** - the machine executing jobs (GitHub provides Ubuntu, Windows, macOS).

## Workflow Structure

\`\`\`yaml
name: CI Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 2 * * *'    # daily at 2am UTC

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build
\`\`\`

## Managing Secrets

Store credentials in GitHub repo Settings > Secrets > Actions. Never hardcode them.

\`\`\`yaml
- name: Deploy to server
  env:
    DEPLOY_KEY: \${{ secrets.DEPLOY_SSH_KEY }}
    SERVER_IP: \${{ secrets.PROD_SERVER_IP }}
  run: |
    echo "$DEPLOY_KEY" > /tmp/deploy_key
    chmod 600 /tmp/deploy_key
    rsync -avz -e "ssh -i /tmp/deploy_key" ./dist/ ubuntu@$SERVER_IP:/var/www/app/
\`\`\`

## Matrix Builds

Test against multiple versions simultaneously:

\`\`\`yaml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20, 22]

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
      - run: npm ci && npm test
\`\`\`

## Caching Dependencies

\`\`\`yaml
# Built into setup-node (simplest approach)
- uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'npm'

# Manual cache control
- uses: actions/cache@v4
  with:
    path: ~/.npm
    key: \${{ runner.os }}-node-\${{ hashFiles('**/package-lock.json') }}
\`\`\`

## Full CI/CD Pipeline Example

\`\`\`yaml
name: CI/CD

on:
  push:
    branches: [main]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: testpass
          POSTGRES_DB: testdb
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-retries 5

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run migrate
        env:
          DATABASE_URL: postgres://postgres:testpass@localhost:5432/testdb
      - run: npm test
        env:
          DATABASE_URL: postgres://postgres:testpass@localhost:5432/testdb

  deploy:
    needs: test                                           # only runs if test passes
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'                  # only on main branch

    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - name: Deploy to S3
        env:
          AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
        run: aws s3 sync ./dist s3://my-app-bucket --delete
\`\`\`

## Useful Patterns

\`\`\`yaml
# Slack notification on failure
- name: Notify Slack
  if: failure()
  uses: slackapi/slack-github-action@v1
  with:
    payload: '{"text": "Build failed on \${{ github.ref }}"}'
  env:
    SLACK_WEBHOOK_URL: \${{ secrets.SLACK_WEBHOOK }}

# Run step only on specific branch
- run: npm run deploy:prod
  if: github.ref == 'refs/heads/main'
\`\`\``
  },

  {
    slug: 'prometheus-monitoring-guide',
    title: 'Prometheus: Metrics, PromQL & Alerting',
    category: 'devops',
    content: `## How Prometheus Works

Prometheus **pulls** (scrapes) metrics from your services on a schedule (default: every 15s). Each service exposes a \`/metrics\` HTTP endpoint. This pull model means: if Prometheus can't reach a service, you know it's down.

## Metric Types

**Counter** - only goes up. Total requests, total errors, bytes sent.

\`\`\`
http_requests_total{method="GET", status="200"} 1234
\`\`\`

**Gauge** - can go up or down. Current connections, memory usage, queue depth.

\`\`\`
active_connections 42
process_resident_memory_bytes 52428800
\`\`\`

**Histogram** - samples observations into buckets. Latencies, response sizes. Enables percentile calculation.

\`\`\`
http_request_duration_seconds_bucket{le="0.1"} 8000
http_request_duration_seconds_bucket{le="0.5"} 9500
http_request_duration_seconds_count 10000
http_request_duration_seconds_sum 1234.5
\`\`\`

**Summary** - like histogram but calculates quantiles client-side. Less flexible for aggregation.

## Instrumenting a Node.js App

\`\`\`javascript
const client = require('prom-client');
client.collectDefaultMetrics();   // CPU, memory, event loop

const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'route', 'status'],
});

const httpDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration',
  labelNames: ['method', 'route'],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5],
});

// Express middleware
app.use((req, res, next) => {
  const end = httpDuration.startTimer({ method: req.method, route: req.path });
  res.on('finish', () => {
    httpRequestsTotal.inc({ method: req.method, route: req.path, status: res.statusCode });
    end();
  });
  next();
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});
\`\`\`

## PromQL Basics

\`\`\`promql
# Rate of requests per second over 5 min window
rate(http_requests_total[5m])

# Sum across all instances
sum(rate(http_requests_total[5m]))

# Sum by route
sum(rate(http_requests_total[5m])) by (route)

# Error rate percentage
sum(rate(http_requests_total{status=~"5.."}[5m]))
/ sum(rate(http_requests_total[5m])) * 100

# 99th percentile latency
histogram_quantile(0.99,
  sum(rate(http_request_duration_seconds_bucket[5m])) by (le)
)

# Average over time
avg_over_time(active_connections[1h])
\`\`\`

## Alerting Rules

\`\`\`yaml
groups:
  - name: api-alerts
    rules:
      - alert: HighErrorRate
        expr: |
          sum(rate(http_requests_total{status=~"5.."}[5m]))
          / sum(rate(http_requests_total[5m])) > 0.05
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "Error rate above 5% for 2 minutes"

      - alert: HighLatency
        expr: |
          histogram_quantile(0.99,
            sum(rate(http_request_duration_seconds_bucket[5m])) by (le)
          ) > 1.0
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "p99 latency above 1 second"
\`\`\`

## Alertmanager Configuration

Routes alerts to the right channels:

\`\`\`yaml
route:
  group_by: ['alertname']
  group_wait: 30s
  repeat_interval: 4h
  receiver: 'slack-ops'

  routes:
  - match:
      severity: critical
    receiver: 'pagerduty-oncall'

receivers:
- name: 'slack-ops'
  slack_configs:
  - api_url: 'https://hooks.slack.com/...'
    channel: '#alerts'

- name: 'pagerduty-oncall'
  pagerduty_configs:
  - routing_key: 'your-integration-key'
\`\`\`

## Key Exporters

- **node_exporter** - CPU, memory, disk, network on Linux hosts
- **blackbox_exporter** - probe HTTP/TCP endpoints, check SSL cert expiry
- **postgres_exporter** - query stats, replication lag
- **redis_exporter** - memory usage, hit rate, connected clients`
  },

  {
    slug: 'sre-concepts-guide',
    title: 'SRE Concepts: SLOs, SLIs, SLAs & Error Budgets',
    category: 'devops',
    content: `## What SRE Actually Is

Site Reliability Engineering is not "DevOps with a fancier title." SRE applies software engineering to operations problems. The core idea: reliability is a feature, and it should be measured and managed like one.

Google's SRE book defined this. Every major product company has adopted some version of it.

## SLI - What You Measure

A **Service Level Indicator** is a quantitative measurement of service behavior.

Good SLIs:
- **Availability**: percentage of successful (non-5xx) requests
- **Latency**: percentage of requests served under a threshold (e.g., < 200ms)
- **Error rate**: percentage of requests resulting in errors

\`\`\`
Availability SLI = (successful_requests / total_requests) x 100
Latency SLI = (requests_under_200ms / total_requests) x 100
\`\`\`

Avoid vanity SLIs. "Server uptime" sounds good but tells you nothing about user experience. Your app can be "up" but returning errors to 30% of users.

## SLO - Your Target

A **Service Level Objective** is the target value for an SLI over a time window.

\`\`\`
Availability SLO: 99.9% over 30 days
Latency SLO: 95% of requests < 200ms over 7 days
\`\`\`

SLOs are **internal targets**, not public promises. Start conservative (99.5%) and tighten over time based on what you can sustain.

## SLA - The Contract

A **Service Level Agreement** is the business contract with customers defining penalties (credits, refunds) if SLOs are breached.

\`\`\`
SLA: 99.9% monthly uptime. Breach -> 10% service credit.
\`\`\`

SLA < SLO always. If your SLO is 99.9%, your SLA should be 99.5%. The gap gives you a buffer before customers trigger credits.

## Error Budget

**Error budget = 1 - SLO**

If your availability SLO is 99.9%, your monthly error budget is 0.1%.

\`\`\`
Monthly error budget = 30 days x 24h x 60m x 0.1% = 43.2 minutes of downtime
\`\`\`

This converts an abstract reliability target into a concrete resource you can spend or save.

## Error Budget Policy

\`\`\`
Budget remaining > 50%  -> ship features freely
Budget remaining 10-50% -> slow down releases, increase testing
Budget remaining < 10%  -> freeze non-critical deployments
Budget exhausted         -> all engineering effort goes to reliability
\`\`\`

This resolves the classic conflict between dev teams (want to ship) and ops teams (want stability). The error budget is a shared resource both teams have an interest in not wasting.

## Burn Rate

\`\`\`
Burn rate = (current error rate) / (1 - SLO)

If SLO = 99.9%, error budget = 0.1%:
  1% error rate -> burn rate = 1% / 0.1% = 10x
  At 10x burn rate, you exhaust monthly budget in 3 days
\`\`\`

Alert on burn rate, not just when SLO is breached. By the time SLO is breached, you've already failed.

## Toil

Toil is manual, repetitive, automatable operational work with no enduring value.

Examples:
- Manually restarting a service when it crashes
- Running a script every Monday to purge old data
- Responding to the same alert 50 times without fixing root cause

Google's SRE rule: keep toil below 50% of each SRE's time. The rest goes toward engineering work that reduces future toil.

## Putting It Together

\`\`\`
1. Define SLIs representing user experience
2. Set achievable SLOs
3. Calculate error budget
4. Write error budget policy
5. Alert on burn rate, not threshold breaches
6. Use error budget to drive reliability vs feature velocity tradeoff
7. Track and eliminate toil systematically
\`\`\`

SRE gives engineering teams a shared language for reliability. Interviewers at product companies ask about this because it signals you think about systems at scale.`
  },

  {
    slug: 'sql-joins-explained',
    title: 'SQL JOINs Explained with Visual Examples',
    category: 'data-analyst',
    content: `## What JOINs Do

JOINs combine rows from two tables based on a related column. Understanding which JOIN to use is one of the most tested SQL skills in data analyst interviews.

We will use these tables throughout:

\`\`\`
orders                          customers
+----+-------------+--------+   +----+--------+--------+
| id | customer_id | amount |   | id | name   | city   |
+----+-------------+--------+   +----+--------+--------+
|  1 |           1 |   500  |   |  1 | Priya  | Mumbai |
|  2 |           2 |   300  |   |  2 | Rahul  | Delhi  |
|  3 |           4 |   200  |   |  3 | Sneha  | Pune   |
|  4 |           1 |   750  |   +----+--------+--------+
+----+-------------+--------+
(customer 3 has no order; order 3 has no matching customer)
\`\`\`

## INNER JOIN

Returns only rows with a match in **both** tables.

\`\`\`sql
SELECT o.id, c.name, o.amount
FROM orders o
INNER JOIN customers c ON o.customer_id = c.id;
\`\`\`

\`\`\`
id | name  | amount
 1 | Priya |    500
 2 | Rahul |    300
 4 | Priya |    750
-- Order 3 dropped (no matching customer)
-- Sneha dropped (no orders)
\`\`\`

## LEFT JOIN

All rows from the **left** table. NULLs for non-matching right table rows.

\`\`\`sql
SELECT c.name, o.amount
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id;
\`\`\`

\`\`\`
name  | amount
Priya |    500
Priya |    750
Rahul |    300
Sneha |   NULL   <- no orders, still appears
\`\`\`

Use LEFT JOIN when you want all records from the main table, including those with no matches.

## RIGHT JOIN

All rows from the **right** table. Rarely used - you can always rewrite as LEFT JOIN by swapping table order.

## FULL OUTER JOIN

All rows from both tables. NULLs on whichever side has no match.

\`\`\`sql
SELECT c.name, o.amount
FROM customers c
FULL OUTER JOIN orders o ON c.id = o.customer_id;
\`\`\`

\`\`\`
name  | amount
Priya |    500
Priya |    750
Rahul |    300
Sneha |   NULL   <- customer with no order
NULL  |    200   <- order with no customer
\`\`\`

## SELF JOIN

A table joined to itself. Classic use: employee-manager hierarchy.

\`\`\`sql
SELECT e.name AS employee, m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;
\`\`\`

## CROSS JOIN

Cartesian product - every row from A paired with every row from B.

\`\`\`sql
-- Generate all size-color combinations
SELECT sizes.name, colors.name
FROM sizes CROSS JOIN colors;
-- 10 sizes x 5 colors = 50 rows
\`\`\`

## Joining on Multiple Conditions

\`\`\`sql
SELECT *
FROM orders o
JOIN promotions p
  ON o.customer_id = p.customer_id
  AND o.order_date BETWEEN p.start_date AND p.end_date;
\`\`\`

## NULL Trap in Outer Joins

Filtering on a right-table column in WHERE silently converts LEFT JOIN to INNER JOIN:

\`\`\`sql
-- This eliminates Sneha (NULL > 100 is false)
SELECT c.name, o.amount
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE o.amount > 100;    -- WRONG

-- Correct: filter in JOIN condition or handle NULLs
WHERE o.amount > 100 OR o.amount IS NULL;
\`\`\`

## Performance Considerations

- JOIN columns should have indexes, especially foreign keys
- Avoid joining on expressions: \`ON YEAR(o.date) = 2024\` - indexes won't be used
- Use EXPLAIN / EXPLAIN ANALYZE to see the query plan and spot missing indexes
- High-cardinality JOIN columns (user_id) perform better than low-cardinality (status)`
  },

  {
    slug: 'sql-window-functions-guide',
    title: 'SQL Window Functions: ROW_NUMBER, RANK, LAG & LEAD',
    category: 'data-analyst',
    content: `## Window Functions vs GROUP BY

GROUP BY collapses rows into groups - you lose individual rows.

Window functions compute across rows **without collapsing them**. Each row keeps its own value plus gets a computed column based on a window of related rows.

\`\`\`sql
-- GROUP BY: one row per department
SELECT department, AVG(salary) FROM employees GROUP BY department;

-- Window function: every row, plus their dept average
SELECT name, salary, department,
       AVG(salary) OVER (PARTITION BY department) AS dept_avg
FROM employees;
\`\`\`

## The OVER() Clause

\`\`\`sql
function_name() OVER (
  PARTITION BY column   -- define groups (like GROUP BY)
  ORDER BY column       -- order within each group
  ROWS BETWEEN ...      -- optional frame specification
)
\`\`\`

## ROW_NUMBER, RANK, DENSE_RANK

\`\`\`sql
SELECT name, department, salary,
  ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS row_num,
  RANK()       OVER (PARTITION BY department ORDER BY salary DESC) AS rank,
  DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dense_rank
FROM employees;
\`\`\`

\`\`\`
name   dept  salary  row_num  rank  dense_rank
Priya  Eng    90000      1      1       1
Rahul  Eng    85000      2      2       2
Sneha  Eng    85000      3      2       2
Amit   Eng    80000      4      4       3   <- rank skips 3, dense_rank does not
\`\`\`

**ROW_NUMBER** - always unique. **RANK** - skips numbers after ties. **DENSE_RANK** - no gaps.

Top-1 per group pattern:

\`\`\`sql
SELECT * FROM (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rn
  FROM employees
) t WHERE rn = 1;
\`\`\`

## LAG and LEAD

Compare a row to the previous or next row.

\`\`\`sql
SELECT
  order_date,
  revenue,
  LAG(revenue)  OVER (ORDER BY order_date) AS prev_day_revenue,
  LEAD(revenue) OVER (ORDER BY order_date) AS next_day_revenue,
  revenue - LAG(revenue) OVER (ORDER BY order_date) AS day_over_day_change
FROM daily_revenue;
\`\`\`

## FIRST_VALUE and LAST_VALUE

\`\`\`sql
SELECT
  name, department, salary,
  FIRST_VALUE(name) OVER (PARTITION BY department ORDER BY salary DESC) AS top_earner,
  LAST_VALUE(name) OVER (
    PARTITION BY department ORDER BY salary DESC
    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
  ) AS lowest_earner
FROM employees;
\`\`\`

LAST_VALUE needs the explicit frame clause - without it the default frame only goes to the current row.

## Running Total with SUM() OVER

\`\`\`sql
SELECT
  order_date,
  revenue,
  SUM(revenue) OVER (ORDER BY order_date) AS running_total,
  SUM(revenue) OVER (
    PARTITION BY EXTRACT(MONTH FROM order_date)
    ORDER BY order_date
  ) AS monthly_running_total
FROM daily_revenue;
\`\`\`

## Moving Average

\`\`\`sql
SELECT
  order_date,
  revenue,
  AVG(revenue) OVER (
    ORDER BY order_date
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  ) AS seven_day_avg
FROM daily_revenue;
\`\`\`

## Month-over-Month Growth (Practical)

\`\`\`sql
WITH monthly AS (
  SELECT
    DATE_TRUNC('month', order_date) AS month,
    SUM(revenue) AS total_revenue
  FROM orders
  GROUP BY 1
)
SELECT
  month,
  total_revenue,
  LAG(total_revenue) OVER (ORDER BY month) AS prev_month,
  ROUND(
    (total_revenue - LAG(total_revenue) OVER (ORDER BY month))
    / LAG(total_revenue) OVER (ORDER BY month) * 100, 2
  ) AS mom_growth_pct
FROM monthly;
\`\`\`

## Percentile Ranking

\`\`\`sql
SELECT
  name,
  salary,
  PERCENT_RANK() OVER (ORDER BY salary) AS percentile,
  NTILE(4)       OVER (ORDER BY salary) AS quartile
FROM employees;
-- NTILE(4) divides into quartiles Q1-Q4
\`\`\``
  },

  {
    slug: 'sql-subqueries-cte-guide',
    title: 'SQL Subqueries & CTEs: Writing Clean Complex Queries',
    category: 'data-analyst',
    content: `## When You Need More Than One Query

Most real analysis needs intermediate steps: filter by aggregated values, join with calculated results, or traverse hierarchical data. Subqueries and CTEs let you break complex problems into readable pieces.

## Subquery in WHERE

\`\`\`sql
-- Employees earning above company average
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);
\`\`\`

The inner query runs first, returns one value, outer query uses it.

## Correlated vs Non-Correlated Subqueries

**Non-correlated** - runs once, independent of outer query.

**Correlated** - runs once per row, references the outer query.

\`\`\`sql
-- Correlated: find max earner in each department
SELECT name, department, salary
FROM employees e1
WHERE salary = (
  SELECT MAX(salary)
  FROM employees e2
  WHERE e2.department = e1.department   -- references outer query
);
\`\`\`

Correlated subqueries can be slow on large tables - each row triggers an inner query. Often replaceable with window functions.

## Subquery in FROM (Derived Table)

\`\`\`sql
-- Average order value by customer tier
SELECT tier, AVG(order_value) AS avg_order
FROM (
  SELECT
    customer_id,
    SUM(amount) AS order_value,
    CASE WHEN SUM(amount) > 10000 THEN 'high'
         WHEN SUM(amount) > 3000  THEN 'mid'
         ELSE 'low' END AS tier
  FROM orders
  GROUP BY customer_id
) customer_summary
GROUP BY tier;
\`\`\`

## EXISTS vs IN

\`\`\`sql
-- IN: works well for small lists
SELECT name FROM customers
WHERE id IN (SELECT customer_id FROM orders WHERE amount > 500);

-- EXISTS: more efficient for large result sets
-- stops scanning as soon as one match is found
SELECT name FROM customers c
WHERE EXISTS (
  SELECT 1 FROM orders o
  WHERE o.customer_id = c.id AND o.amount > 500
);
\`\`\`

Use EXISTS when the subquery could return many rows. Use IN for small, static lists.

## CTEs with WITH

CTEs name a subquery so you can reference it like a table. Cleaner than deeply nested subqueries.

\`\`\`sql
WITH high_value_customers AS (
  SELECT customer_id, SUM(amount) AS total_spent
  FROM orders
  GROUP BY customer_id
  HAVING SUM(amount) > 10000
),
customer_details AS (
  SELECT c.id, c.name, c.city, h.total_spent
  FROM customers c
  JOIN high_value_customers h ON c.id = h.customer_id
)
SELECT city, COUNT(*) AS count, AVG(total_spent) AS avg_spend
FROM customer_details
GROUP BY city
ORDER BY avg_spend DESC;
\`\`\`

Multiple CTEs are separated by commas. Each can reference previous CTEs.

## Recursive CTEs

Traverse hierarchical data: org charts, category trees, bill of materials.

\`\`\`sql
-- Find all reports under a manager (including indirect)
WITH RECURSIVE org_tree AS (
  -- Anchor: start with the manager
  SELECT id, name, manager_id, 0 AS depth
  FROM employees
  WHERE id = 5

  UNION ALL

  -- Recursive: join employees to their parent in the CTE
  SELECT e.id, e.name, e.manager_id, ot.depth + 1
  FROM employees e
  JOIN org_tree ot ON e.manager_id = ot.id
)
SELECT id, name, depth FROM org_tree ORDER BY depth, name;
\`\`\`

## When to Use What

| Approach | Use When |
|----------|----------|
| Subquery in WHERE | Single value or list filter |
| Correlated subquery | Row-by-row comparison (check for window function alternatives first) |
| Derived table (FROM) | Need intermediate aggregation to join or filter |
| EXISTS | Existence check against large result set |
| CTE | Multiple steps, reusing subquery, readability matters |
| Recursive CTE | Hierarchical data, series generation |

CTEs are not always faster than subqueries - the planner may optimize both identically. Use CTEs for readability, then optimize with EXPLAIN if needed.`
  },

  {
    slug: 'pandas-data-analysis-guide',
    title: 'Pandas: The Essential Guide for Data Analysts',
    category: 'data-analyst',
    content: `## Why Pandas

Pandas is Python's primary data manipulation library. It gives you Excel-like operations in code with automation, reproducibility, and the ability to handle millions of rows efficiently.

## Reading Data

\`\`\`python
import pandas as pd

df = pd.read_csv('sales.csv')
df = pd.read_csv('sales.csv', parse_dates=['order_date'], index_col='id')
df = pd.read_excel('report.xlsx', sheet_name='Sheet1')

# From a database
from sqlalchemy import create_engine
engine = create_engine('postgresql://user:pass@localhost/mydb')
df = pd.read_sql('SELECT * FROM orders WHERE year = 2024', engine)
\`\`\`

## Exploring a DataFrame

\`\`\`python
df.shape            # (rows, columns)
df.dtypes           # column data types
df.info()           # types + non-null counts
df.describe()       # count, mean, std, min, percentiles, max
df.head(10)
df.tail(5)
df.nunique()        # unique value count per column
df.columns.tolist()
\`\`\`

## Selecting Data

\`\`\`python
# Single column (returns Series)
df['revenue']

# Multiple columns (returns DataFrame)
df[['name', 'revenue', 'date']]

# loc - label-based
df.loc[0]                         # row with index label 0
df.loc[0:5, 'revenue':'date']     # slice

# iloc - position-based
df.iloc[0]                        # first row
df.iloc[0:5, 2:5]                 # rows 0-4, columns 2-4

# Boolean indexing
df[df['revenue'] > 10000]
df[(df['region'] == 'South') & (df['revenue'] > 5000)]
df[df['category'].isin(['Electronics', 'Clothing'])]
\`\`\`

## Filtering and Sorting

\`\`\`python
high_value = df[df['revenue'] > df['revenue'].quantile(0.9)]

df.sort_values('revenue', ascending=False)
df.sort_values(['region', 'revenue'], ascending=[True, False])

df['category'].unique()
df['category'].value_counts()
\`\`\`

## GroupBy and Aggregation

\`\`\`python
# Basic groupby
df.groupby('region')['revenue'].sum()
df.groupby('region')['revenue'].agg(['mean', 'sum', 'count'])

# Multiple columns, named aggregations
df.groupby(['region', 'category']).agg(
    total_revenue=('revenue', 'sum'),
    avg_order=('revenue', 'mean'),
    order_count=('id', 'count')
).reset_index()

# Transform - keeps original index (adds group stats to each row)
df['region_avg'] = df.groupby('region')['revenue'].transform('mean')
\`\`\`

## Merging DataFrames

\`\`\`python
# SQL-style JOIN
merged = pd.merge(orders, customers, on='customer_id', how='left')
merged = pd.merge(orders, customers,
                  left_on='cust_id', right_on='id', how='inner')

# Stack rows
combined = pd.concat([df_2023, df_2024], ignore_index=True)
\`\`\`

## Handling Missing Values

\`\`\`python
df.isnull().sum()                    # count nulls per column
df.isnull().mean() * 100             # % null

df.dropna()                          # drop rows with any null
df.dropna(subset=['revenue'])        # only if specific column is null

df['city'].fillna('Unknown')
df['revenue'].fillna(df['revenue'].median())
df.ffill()                           # forward fill (for time series)
\`\`\`

## Applying Functions

\`\`\`python
# apply on a Series
df['revenue_k'] = df['revenue'].apply(lambda x: round(x / 1000, 2))

# apply on rows (axis=1)
df['label'] = df.apply(
    lambda row: 'high' if row['revenue'] > 10000 else 'low', axis=1
)

# map - replace values
df['region'] = df['region'].map({'N': 'North', 'S': 'South'})

# vectorized operations are faster than apply for simple math
df['revenue_with_tax'] = df['revenue'] * 1.18
\`\`\`

## Saving Data

\`\`\`python
df.to_csv('output.csv', index=False)
df.to_excel('output.xlsx', sheet_name='Results', index=False)
df.to_sql('analysis_results', engine, if_exists='replace', index=False)
df.to_parquet('output.parquet')    # efficient columnar format
\`\`\`

## Complete Workflow Example

\`\`\`python
import pandas as pd

df = pd.read_csv('orders.csv', parse_dates=['order_date'])

# Clean
df = df.dropna(subset=['customer_id', 'revenue'])
df['revenue'] = pd.to_numeric(df['revenue'], errors='coerce')

# Enrich
df['month'] = df['order_date'].dt.to_period('M')
df['is_high_value'] = df['revenue'] > 10000

# Analyze
monthly_summary = df.groupby('month').agg(
    orders=('id', 'count'),
    revenue=('revenue', 'sum'),
    avg_order=('revenue', 'mean')
).reset_index()

print(monthly_summary.tail(6))
monthly_summary.to_csv('monthly_summary.csv', index=False)
\`\`\``
  },

  {
    slug: 'statistics-for-analysts',
    title: 'Statistics Every Data Analyst Needs to Know',
    category: 'data-analyst',
    content: `## Why Statistics Matter

Data without statistics is just rows. Statistics let you summarize, compare, and draw conclusions that are defensible rather than based on eyeballing charts.

## Mean vs Median - When Each Misleads

**Mean** - sum divided by count. Sensitive to outliers.

**Median** - middle value when sorted. Robust to outliers.

\`\`\`python
import numpy as np

salaries = [40000, 42000, 45000, 48000, 50000, 51000, 200000]

print(np.mean(salaries))    # 68000 - pulled up by the 200k outlier
print(np.median(salaries))  # 48000 - represents a typical employee
\`\`\`

Always use median for salary, house prices, response times, revenue. Mean page load time can look fine while p99 is terrible.

**Mode** - most frequent value. Useful for categorical data.

## Measures of Spread

**Standard Deviation** - average distance from the mean, in same units as data.

\`\`\`python
data = [10, 12, 14, 16, 18]
np.std(data)           # population std (ddof=0)
np.std(data, ddof=1)   # sample std - use this for real-world samples
\`\`\`

**IQR (Interquartile Range)** - Q3 minus Q1. Range of the middle 50% of data. Robust to outliers.

\`\`\`python
q1 = np.percentile(data, 25)
q3 = np.percentile(data, 75)
iqr = q3 - q1
\`\`\`

## Outlier Detection: 1.5xIQR Rule

\`\`\`python
lower_bound = q1 - 1.5 * iqr
upper_bound = q3 + 1.5 * iqr
outliers = [x for x in data if x < lower_bound or x > upper_bound]
\`\`\`

This is what box plots show. It is a heuristic - not every flagged point is a real outlier.

## The Normal Distribution

Many natural phenomena approximate a bell curve. The empirical rule:

- 68% of data falls within **1 standard deviation** of the mean
- 95% falls within **2 standard deviations**
- 99.7% falls within **3 standard deviations**

\`\`\`python
# Z-score: how many std deviations from the mean
z = (value - mean) / std
# z=2 means the value is in the top ~2.5%
\`\`\`

A response time 3 standard deviations above average is extremely unusual - investigate it.

## Skewness and Kurtosis

**Skewness** measures asymmetry:
- Positive (right) skew: long tail right, mean > median. Common for income, revenue.
- Negative (left) skew: long tail left, mean < median. Common for test scores near maximum.

**Kurtosis** measures tail heaviness relative to normal:
- High kurtosis: more extreme outliers than a normal distribution
- Low kurtosis: fewer extreme outliers

\`\`\`python
from scipy.stats import skew, kurtosis
print(skew(data))
print(kurtosis(data))   # excess kurtosis (0 = normal)
\`\`\`

## Percentiles

\`\`\`python
import pandas as pd
s = pd.Series(data)

print(s.quantile(0.5))    # 50th percentile = median
print(s.quantile(0.9))    # 90th percentile
print(s.quantile(0.99))   # 99th percentile

s.quantile([0.25, 0.5, 0.75, 0.9, 0.95, 0.99])
\`\`\`

For response times, always report p50, p95, and p99. The mean hides the slow tail that worst-case users experience.

## Correlation

**Pearson (r)** - measures linear relationship. Range: -1 to +1.

\`\`\`python
from scipy import stats
r, p_value = stats.pearsonr(x, y)
# r near 1: strong positive linear
# r near -1: strong negative linear
# r near 0: no linear relationship (could still be non-linear)
\`\`\`

**Spearman** - rank-based, works for monotonic (not just linear) relationships. Better with outliers or non-normal data.

\`\`\`python
r_spearman, p = stats.spearmanr(x, y)
\`\`\`

**Correlation does not imply causation.** Ice cream sales correlate with drowning rates - both increase in summer. Always ask: is there a confounding variable?

## P-Value Intuition

The p-value is the probability of seeing a difference this large by chance, assuming no real effect exists.

- p = 0.03: if there were truly no effect, you'd see this result only 3% of the time by chance
- p = 0.60: this difference is easily explained by random variation

p-value is **not** the probability your hypothesis is correct. It is not the probability the result will replicate.

\`\`\`python
# Two-sample t-test: are these two groups different?
t_stat, p_value = stats.ttest_ind(group_a, group_b)
print(f"p-value: {p_value:.4f}")
\`\`\``
  },

  {
    slug: 'ab-testing-guide',
    title: 'A/B Testing: How Product Companies Make Data-Driven Decisions',
    category: 'data-analyst',
    content: `## What A/B Testing Is

An A/B test splits users into two groups: control (A, current experience) and treatment (B, new change). You measure whether the change caused a statistically significant improvement in a key metric.

Product companies make decisions this way: not "our PM thinks this button color is better" but "we measured a 3.2% lift in conversion with p=0.02."

## Hypothesis

**Null hypothesis (H0)**: The change has no effect. Any observed difference is due to random chance.

**Alternative hypothesis (H1)**: The change has a real effect.

Your goal is to collect enough evidence to reject H0. You never "prove" H1 - you show H0 is unlikely.

\`\`\`
H0: conversion_rate(B) = conversion_rate(A)
H1: conversion_rate(B) != conversion_rate(A)  <- two-tailed (safer)
\`\`\`

## P-Value in Plain English

The p-value is the probability of seeing a difference this large by chance, assuming H0 is true.

- p = 0.03: if the change had zero effect, there is a 3% chance of seeing this big a difference from random variation
- p = 0.60: this difference is easily explained by chance

P-value is **not** the probability your hypothesis is correct.

## Statistical Significance

Standard significance level: alpha = 0.05. If p < alpha, you reject H0 and call the result statistically significant.

\`\`\`python
from scipy.stats import chi2_contingency

ctrl_conv, ctrl_n = 50, 1000     # 50 conversions out of 1000
trt_conv, trt_n = 65, 1000      # 65 conversions out of 1000

table = [[ctrl_conv, ctrl_n - ctrl_conv],
         [trt_conv,  trt_n - trt_conv]]

chi2, p, dof, expected = chi2_contingency(table)
print(f"p-value: {p:.4f}")
# p < 0.05 -> statistically significant improvement
\`\`\`

## Statistical Power

Power = 1 - beta = probability of detecting a real effect when it exists. Standard target: 80%.

Low power means: you run a test, see no significant result, and wrongly conclude "the change doesn't work" because your sample was too small.

## Sample Size Calculation

Calculate sample size **before** running the experiment.

\`\`\`python
from statsmodels.stats.proportion import proportion_effectsize, zt_ind_solve_power

# Detect a lift from 5% to 6% conversion rate
es = proportion_effectsize(0.06, 0.05)
n = zt_ind_solve_power(effect_size=es, alpha=0.05, power=0.8)
print(f"Need {int(n)} users per group = {int(n)*2} total")
\`\`\`

## Common Mistakes

**Peeking (optional stopping)** - checking results daily and stopping when p < 0.05 dramatically inflates false positives. Decide sample size upfront and do not stop early.

**Multiple comparisons** - testing 20 metrics with alpha=0.05 means 1 will be significant by chance. Apply Bonferroni correction:

\`\`\`python
alpha_corrected = 0.05 / number_of_tests
\`\`\`

**Network effects** - if users interact (social features, referrals), treatment users affect control users. Groups are not independent and standard tests are invalid. Use cluster randomization.

**Novelty effect** - users engage more because something is new. Run for at least 2 full weeks for novelty to wear off.

**Underpowered tests** - running for 3 days with 1000 users when you need 50,000. Any result is meaningless.

**Survivor bias** - only analyzing users who completed checkout, ignoring those who bounced. Use the full funnel.

## Practical Setup

\`\`\`
1. Define one primary metric (the thing you are optimizing)
2. Define guardrail metrics (things that must not degrade)
3. Calculate required sample size
4. Randomize at user level (not session or request level)
5. Run for full business cycles (not just Tuesday to Thursday)
6. Analyze only after reaching target sample size
7. Ship if p < 0.05 AND the effect is practically meaningful
\`\`\`

A 0.01% lift in conversion might be statistically significant with 10M users but not worth the engineering cost. Always pair statistical significance with **practical significance** - is the effect size large enough to matter?`
  },

  {
    slug: 'data-warehouse-concepts',
    title: 'Data Warehouse: Star Schema, OLAP vs OLTP',
    category: 'data-analyst',
    content: `## OLTP vs OLAP

Your production database is optimized for transactions (OLTP). Your analytics system is optimized for analysis (OLAP). They have fundamentally different requirements.

| | OLTP | OLAP |
|--|------|------|
| Purpose | Record business events | Answer business questions |
| Query type | Simple reads/writes on few rows | Complex aggregations on millions of rows |
| Schema | Highly normalized (3NF) | Denormalized (star/snowflake) |
| Storage | Row store, indexed | Columnar store, full scans |
| Examples | PostgreSQL, MySQL | Redshift, BigQuery, Snowflake |
| Data freshness | Real-time | Minutes to hours (batch ETL) |

Never run heavy analytics on your production OLTP database. It locks tables, slows transactions, and can take down your app.

## Dimensional Modeling

Organize analytical data into two types of tables: **facts** and **dimensions**.

### Fact Tables

Record business events. Each row is one event. Contains numeric measures and foreign keys to dimensions.

\`\`\`sql
CREATE TABLE fact_orders (
  order_id      BIGINT,
  order_date_id INT,           -- FK to dim_date
  customer_id   INT,           -- FK to dim_customer
  product_id    INT,           -- FK to dim_product
  quantity      INT,           -- measure
  revenue       DECIMAL(12,2), -- measure
  discount      DECIMAL(5,2)   -- measure
);
\`\`\`

### Dimension Tables

Describe the "who, what, where, when." Small compared to fact tables. Contain descriptive attributes.

\`\`\`sql
CREATE TABLE dim_customer (
  customer_id   INT PRIMARY KEY,
  name          VARCHAR(100),
  city          VARCHAR(50),
  state         VARCHAR(50),
  customer_tier VARCHAR(20),
  signup_date   DATE
);

-- Pre-built calendar table
CREATE TABLE dim_date (
  date_id     INT PRIMARY KEY,
  full_date   DATE,
  year        INT,
  quarter     INT,
  month       INT,
  month_name  VARCHAR(20),
  day_of_week VARCHAR(10),
  is_weekend  BOOLEAN
);
\`\`\`

## Star Schema

Fact table at center, dimension tables around it. Simple JOINs, easy to understand.

\`\`\`sql
SELECT
  d.month_name,
  c.state,
  SUM(f.revenue) AS total_revenue
FROM fact_orders f
JOIN dim_date d     ON f.order_date_id = d.date_id
JOIN dim_customer c ON f.customer_id = c.customer_id
WHERE d.year = 2024
GROUP BY d.month_name, c.state;
\`\`\`

## Snowflake Schema

Dimension tables are normalized further. A dim_customer might reference a dim_city, which references dim_state.

Star is simpler. Snowflake saves storage but requires more JOINs. Most modern data warehouses prefer star schema.

## Slowly Changing Dimensions (SCD)

What happens when a customer moves cities? How do you preserve history?

**Type 1 - Overwrite**: Just update the record. No history.

**Type 2 - Add new row**: Keep old row, add new row with validity dates.

\`\`\`sql
-- Type 2 SCD example
customer_id | name  | city   | valid_from | valid_to   | is_current
          1 | Priya | Mumbai | 2020-01-01 | 2023-06-30 | FALSE
          1 | Priya | Pune   | 2023-07-01 | NULL       | TRUE
\`\`\`

Filter by \`is_current = TRUE\` for current state, or join by date range for historical analysis.

## ETL vs ELT

**ETL** (Extract > Transform > Load): transform before loading. Traditional, used when warehouse compute was expensive.

**ELT** (Extract > Load > Transform): load raw data first, transform in warehouse using SQL. Modern approach - cloud warehouses make compute cheap. Tools like dbt run the T step.

ELT is now the standard pattern.

## Why Columnar Storage is Faster for Analytics

Row stores (PostgreSQL) store all columns for each row sequentially:

\`\`\`
Row 1: [order_id=1, customer_id=1, revenue=500, date=2024-01-01, ...]
Row 2: [order_id=2, customer_id=2, revenue=300, date=2024-01-02, ...]
\`\`\`

Columnar stores (Redshift, BigQuery) store all values of each column together:

\`\`\`
revenue column: [500, 300, 200, 750, ...]
date column:    [2024-01-01, 2024-01-02, ...]
\`\`\`

When you run \`SELECT SUM(revenue) FROM fact_orders\`, a columnar store reads only the revenue column. A row store reads every column of every row. For a table with 100 columns and 1 billion rows, this difference is enormous - and why Redshift/BigQuery can aggregate billions of rows in seconds.`
  },

  {
    slug: 'descriptive-statistics-guide',
    title: 'Descriptive Statistics: Making Sense of Your Data',
    category: 'data-analyst',
    content: `## Population vs Sample

**Population** - every member of the group you care about (all customers, all transactions).

**Sample** - the subset you actually have data on.

This distinction matters for formulas. Sample standard deviation uses \`ddof=1\` to avoid underestimating spread.

\`\`\`python
import numpy as np
data = [23, 25, 28, 22, 30, 27, 24, 29]

np.std(data)           # population std (ddof=0)
np.std(data, ddof=1)   # sample std - use this for real-world data
\`\`\`

## Mean, Median, Mode

\`\`\`python
import pandas as pd

salaries = pd.Series([35000, 38000, 40000, 42000, 45000, 48000, 200000])

print(salaries.mean())      # 64000 - distorted by 200k outlier
print(salaries.median())    # 42000 - represents a typical employee
print(salaries.mode()[0])   # most frequent value
\`\`\`

**Median beats mean when:**
- Data is right-skewed (salary, house prices, transaction amounts, response times)
- The mean is pulled toward the tail and misrepresents the typical case

**Mean is fine when:** Distribution is symmetric, without extreme outliers.

## Variance and Standard Deviation

Variance = average squared distance from the mean. Squaring penalizes large deviations more.

Standard deviation = square root of variance (same units as data, easy to interpret).

\`\`\`python
mean = salaries.mean()
variance = ((salaries - mean) ** 2).mean()
std = variance ** 0.5

# Or just
print(salaries.var())   # variance
print(salaries.std())   # standard deviation
\`\`\`

Intuition: if std = 10,000, most values are within 10,000 of the mean. High std = high spread.

## IQR and Outlier Detection

\`\`\`python
q1 = salaries.quantile(0.25)
q3 = salaries.quantile(0.75)
iqr = q3 - q1

lower_fence = q1 - 1.5 * iqr
upper_fence = q3 + 1.5 * iqr

outliers = salaries[(salaries < lower_fence) | (salaries > upper_fence)]
print(f"Outliers: {outliers.tolist()}")    # [200000]
\`\`\`

The 1.5xIQR rule comes from box plot conventions. Flagged points are worth investigating - not automatically wrong.

## Percentiles and Quantiles

\`\`\`python
print(salaries.quantile(0.5))    # median
print(salaries.quantile(0.9))    # 90th percentile
print(salaries.quantile(0.99))   # 99th percentile

salaries.describe()
# gives: count, mean, std, min, 25%, 50%, 75%, max

salaries.quantile([0.1, 0.25, 0.5, 0.75, 0.9, 0.95, 0.99])
\`\`\`

For response times: always report p50, p95, p99 - not just the mean. The mean hides the tail that worst-case users experience.

## Box Plot Interpretation

A box plot shows:
- **Box** = IQR (Q1 to Q3)
- **Line inside box** = median
- **Whiskers** = extend to last data point within 1.5xIQR
- **Dots beyond whiskers** = outliers

\`\`\`python
import matplotlib.pyplot as plt
fig, ax = plt.subplots()
ax.boxplot(salaries)
ax.set_ylabel('Salary')
plt.title('Salary Distribution')
plt.show()
\`\`\`

Wide box = high spread. Median near top of box = negative skew. Median near bottom = positive skew.

## Histograms and Distribution Shape

\`\`\`python
salaries.hist(bins=20)
\`\`\`

**Symmetric bell shape** - approximately normal. Mean roughly equals median.

**Right skew (long right tail)** - mean > median. Common for revenue, salaries, response times.

**Left skew (long left tail)** - mean < median. Common for scores near maximum possible value.

**Bimodal (two peaks)** - two distinct subpopulations in your data. Segment before analyzing.

**Uniform** - all values equally likely. Often a data quality issue (default value used for unknowns).

## EDA Checklist

\`\`\`python
def quick_eda(series, name=""):
    print(f"--- {name} ---")
    print(f"Count:    {series.count()}")
    print(f"Missing:  {series.isnull().sum()} ({series.isnull().mean():.1%})")
    print(f"Mean:     {series.mean():.2f}")
    print(f"Median:   {series.median():.2f}")
    print(f"Std:      {series.std():.2f}")
    print(f"IQR:      {series.quantile(0.75) - series.quantile(0.25):.2f}")
    print(f"Min/Max:  {series.min()} / {series.max()}")
    print(f"Skewness: {series.skew():.2f}")

quick_eda(df['revenue'], 'Revenue')
\`\`\``
  },
];

// ─── SDE CORE ARTICLES — DSA · OS · Git · System Design · Behavioural ────────
// 25 articles · 500-800 words each · For Indian engineers switching to product companies

const ARTICLES_SDE = [
  {
    slug: 'big-o-analysis',
    title: 'Big-O Analysis: Time & Space Complexity',
    content: `
## Why Big-O Actually Matters

If you've been at TCS or Infosys for a few years, you've written code that works. But "works" isn't enough for product company interviews. Amazon, Flipkart, and Swiggy interviewers will ask you to explain *why* your solution is efficient — and they want numbers, not feelings.

Big-O notation is how we measure that. It describes how an algorithm's runtime or memory grows as input size (n) grows toward infinity. Constants and lower-order terms are dropped because at scale, they don't matter.

---

## The Common Complexities — Ranked Fastest to Slowest

| Complexity | Name | Example |
|---|---|---|
| O(1) | Constant | Hash map lookup |
| O(log n) | Logarithmic | Binary search |
| O(n) | Linear | Single loop |
| O(n log n) | Linearithmic | Merge sort |
| O(n²) | Quadratic | Nested loops |
| O(2^n) | Exponential | Recursive subsets |
| O(n!) | Factorial | Permutations brute force |

Practical rule: if n > 10^5, avoid O(n²). If n > 10^7, even O(n log n) gets tight.

---

## How to Analyze Loops

**Single loop → O(n)**
\`\`\`javascript
function sumArray(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) { // runs n times
    sum += arr[i];
  }
  return sum;
}
// Time: O(n) | Space: O(1)
\`\`\`

**Nested loops → O(n²)**
\`\`\`javascript
function printPairs(arr) {
  for (let i = 0; i < arr.length; i++) {       // n times
    for (let j = 0; j < arr.length; j++) {     // n times each
      console.log(arr[i], arr[j]);
    }
  }
}
// Time: O(n²) | Space: O(1)
// Classic service-company mistake: calling this "fine for small inputs"
\`\`\`

**Loop that halves each iteration → O(log n)**
\`\`\`javascript
function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}
// Time: O(log n) — search space halves each step
// Space: O(1)
\`\`\`

---

## How to Analyze Recursion

Recursion complexity = (number of recursive calls) × (work per call).

**Fibonacci naive → O(2^n)**
\`\`\`javascript
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2); // 2 calls per level, n levels deep
}
// Time: O(2^n) — each call branches into 2
// This is why memoization matters
\`\`\`

With memoization, this drops to O(n) because each value is computed once.

---

## Space Complexity — The Forgotten Half

Space complexity counts extra memory your algorithm uses (not counting input).

- A recursive function with depth d uses **O(d)** stack space
- Storing a hash map of n elements = **O(n)** space
- Sorting in-place (like quicksort) = **O(log n)** stack space for recursion

**Interview tip:** When you give your complexity, always state both. "This is O(n) time and O(1) space" signals you know your craft.

---

## What Interviewers Actually Check

1. Can you state the complexity of your solution *before* coding it?
2. Can you identify the bottleneck (usually the nested loop or the recursive branch)?
3. Can you propose a trade-off — "I can reduce time from O(n²) to O(n log n) by sorting first, but it adds O(n) space"?

The goal isn't memorization. It's the ability to *reason about code at scale* — exactly what product companies are hiring for.
    `.trim(),
  },

  {
    slug: 'arrays-and-strings-dsa',
    title: 'Arrays & Strings: The Foundation of DSA',
    content: `
## Start Here — Always

Arrays and strings make up 30-40% of SDE interview questions at product companies. Before you touch trees or graphs, get these patterns sharp. They're foundational because they also appear inside every other data structure problem.

---

## Pattern 1: Two Pointers

**When to use:** Sorted array, find a pair, remove duplicates, palindrome check, partition.

The idea: maintain two indices (left and right, or slow and fast) that move toward each other or chase each other. Avoids the O(n²) brute force of nested loops.

**Two Sum (sorted array)**
\`\`\`javascript
function twoSumSorted(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) return [left, right];
    else if (sum < target) left++;   // need bigger
    else right--;                    // need smaller
  }
  return [];
}
// Time: O(n) | Space: O(1)
// vs brute force O(n²) — this is the conversation interviewers want
\`\`\`

---

## Pattern 2: Sliding Window

**When to use:** Subarray or substring with a condition (max sum, longest length, exactly k distinct chars). The window grows right and shrinks left — never resets from scratch.

**Max Subarray (Kadane's Algorithm)**
\`\`\`javascript
function maxSubarray(nums) {
  let maxSum = nums[0];
  let current = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // Either extend the window or start fresh from this element
    current = Math.max(nums[i], current + nums[i]);
    maxSum = Math.max(maxSum, current);
  }
  return maxSum;
}
// Time: O(n) | Space: O(1)
// Input: [-2, 1, -3, 4, -1, 2, 1, -5, 4] → Output: 6 ([4,-1,2,1])
\`\`\`

**Longest Substring Without Repeating Characters**
\`\`\`javascript
function lengthOfLongestSubstring(s) {
  const seen = new Map(); // char → last seen index
  let left = 0, maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    if (seen.has(ch) && seen.get(ch) >= left) {
      // shrink window: jump left past the duplicate
      left = seen.get(ch) + 1;
    }
    seen.set(ch, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}
// Time: O(n) | Space: O(min(n, alphabet))
\`\`\`

---

## Pattern 3: Prefix Sums

**When to use:** Range sum queries, subarray sum equals k, equilibrium index. Precompute cumulative sums so any range query is O(1).

\`\`\`javascript
function buildPrefix(arr) {
  const prefix = new Array(arr.length + 1).fill(0);
  for (let i = 0; i < arr.length; i++) {
    prefix[i + 1] = prefix[i] + arr[i];
  }
  // Sum of arr[l..r] = prefix[r+1] - prefix[l]
  return prefix;
}
// Time to build: O(n) | Each query: O(1)
\`\`\`

---

## Choosing the Right Pattern

| Problem Signal | Pattern |
|---|---|
| "Find pair/triplet that sums to X" | Two Pointers or Hash Map |
| "Longest/shortest subarray with condition" | Sliding Window |
| "Sum of subarray from index i to j" | Prefix Sum |
| "All subarrays" (brute force needed) | Nested loops O(n²) |

---

## The Interview Mindset

When you see an array problem, ask yourself:
1. Is the array sorted? → Two pointers might work
2. Am I looking for a contiguous subarray? → Sliding window
3. Will I answer range queries? → Prefix sum

This habit of pattern-matching before coding is what separates product company engineers from service company engineers. Don't jump to code — take 2 minutes to identify the pattern first.
    `.trim(),
  },

  {
    slug: 'os-basics-for-interviews',
    title: 'OS Fundamentals Every SDE Must Know',
    content: `
## Why OS Knowledge Gets You Hired

At Flipkart or Amazon, OS questions don't come in every interview — but when they do, they're quick filters. Engineers from service companies often skip this topic entirely, which means knowing it well gives you an edge.

---

## Processes vs Threads

A **process** is an independent program with its own memory space. A **thread** is a lightweight unit of execution that shares memory with other threads in the same process.

| Property | Process | Thread |
|---|---|---|
| Memory | Separate address space | Shared heap, own stack |
| Communication | IPC (pipes, sockets) | Shared variables |
| Creation cost | High | Low |
| Crash impact | Isolated | Can crash whole process |

**What interviewers ask:** "When would you use multiple processes vs multiple threads?" — Answer: threads for tasks that share data heavily (web server handling requests), processes for isolation (browser tabs, microservices).

---

## Context Switching

When the OS switches the CPU from one thread/process to another, it saves the current state (registers, program counter, stack pointer) into a PCB (Process Control Block) and loads the next one. This is a context switch.

Context switches are expensive (microseconds). Excessive context switching kills performance — this is why Go's goroutines (user-space threads) and Node's event loop (single thread + async I/O) exist.

---

## Deadlocks

A deadlock occurs when two or more threads each hold a resource the other needs, and neither can proceed.

**Four necessary conditions (Coffman conditions):**
1. **Mutual Exclusion** — resource can only be held by one thread at a time
2. **Hold and Wait** — a thread holds a resource while waiting for another
3. **No Preemption** — resources cannot be forcibly taken
4. **Circular Wait** — T1 waits for T2, T2 waits for T1

Break *any one* of these and you break the deadlock.

**Banker's Algorithm (concept):** Before granting a resource request, simulate whether the system will remain in a "safe state" — one where all processes can eventually complete. If not safe, deny the request. Used in OS scheduling theory; in interviews, just knowing the concept and the four conditions is sufficient.

---

## Memory Management

### Stack vs Heap

| | Stack | Heap |
|---|---|---|
| What's stored | Local variables, function call frames | Dynamically allocated objects |
| Management | Automatic (LIFO) | Manual (malloc/free) or GC |
| Size | Small (typically 1-8 MB) | Large (limited by RAM) |
| Speed | Very fast | Slower (allocation overhead) |
| Error | Stack overflow (infinite recursion) | Memory leak |

In JavaScript, primitives go on the stack; objects and arrays go on the heap. In Java, object references are on the stack, objects themselves on the heap.

### Virtual Memory and Paging

Virtual memory lets each process think it has a contiguous, private address space — even if physical RAM is fragmented or smaller than needed.

**Paging:** Virtual address space is divided into fixed-size **pages** (typically 4KB). Physical RAM is divided into **frames** of the same size. The OS maintains a **page table** that maps virtual pages to physical frames.

When a process accesses a page not in RAM: **page fault** → OS loads it from disk. This is why swapping to disk kills performance.

---

## What Interviewers Actually Ask

1. "What is a race condition?" — Two threads access shared data without synchronization, result depends on timing.
2. "How do you prevent deadlock?" — Break one of the four Coffman conditions. Most practical: enforce a global lock ordering so circular wait can't happen.
3. "What's the difference between mutex and semaphore?" — Mutex is a binary lock owned by one thread. Semaphore is a counter — allows N threads simultaneously.
4. "Explain what happens when you call malloc()" — OS request for heap memory, might trigger a page allocation.

Keep answers concise and concrete. Interviewers aren't expecting OS PhD answers — they want to know you understand *why* these concepts matter at runtime.
    `.trim(),
  },

  {
    slug: 'git-fundamentals',
    title: 'Git Mastery: Branch, Merge, Rebase and Beyond',
    content: `
## Git Is Not Optional

In service companies, you might commit to a shared branch with 10 other people and call it a day. In product companies, Git workflow is a daily conversation — code reviews, feature branches, CI/CD pipelines. Not knowing Git properly is a red flag in interviews and on the job.

---

## The Core Commands

\`\`\`bash
git init                     # start a new repo
git clone <url>              # copy remote repo locally
git status                   # what's changed?
git add <file>               # stage specific file
git add .                    # stage everything (use carefully)
git commit -m "message"      # commit with message
git push origin main         # push to remote
git pull origin main         # fetch + merge from remote
git log --oneline            # compact commit history
\`\`\`

---

## Branching Strategy

Every feature, bugfix, or experiment should live on its own branch. This is how product companies work.

\`\`\`bash
git checkout -b feature/user-auth    # create + switch to new branch
git checkout main                    # switch back
git branch -d feature/user-auth      # delete merged branch
git branch -a                        # list all branches (including remote)
\`\`\`

**Standard naming conventions:** \`feature/\`, \`bugfix/\`, \`hotfix/\`, \`chore/\`

---

## Merge vs Rebase — The One That Confuses Everyone

Both integrate changes from one branch into another. The difference is in history.

**Merge:** Creates a new "merge commit" that has two parents. History is preserved exactly as it happened.
\`\`\`
main:    A---B---C-------M
                  \\     /
feature:          D---E
\`\`\`

**Rebase:** Replays your commits on top of the target branch. History looks linear, as if you branched off the latest main.
\`\`\`
Before rebase:
main:    A---B---C
feature:      D---E

After: git rebase main (from feature branch)
main:    A---B---C
feature:          D'---E'   (new commits, replayed on top of C)
\`\`\`

**Rule of thumb:**
- Use \`merge\` for integrating completed features into main (preserves context)
- Use \`rebase\` to keep your feature branch up to date with main (clean history)
- **Never rebase commits that have been pushed to a shared branch** — it rewrites history and breaks others' work

---

## Cherry-Pick

Apply a single specific commit from another branch onto your current branch.

\`\`\`bash
git cherry-pick abc1234    # apply commit abc1234 to current branch
\`\`\`

Use case: a hotfix was committed on a feature branch and you need it in main immediately.

---

## Git Stash

Temporarily shelve uncommitted changes so you can switch context.

\`\`\`bash
git stash                  # save current changes
git stash list             # see all stashes
git stash pop              # apply most recent stash + remove it
git stash apply stash@{1}  # apply a specific stash (keep it)
git stash drop stash@{0}   # delete a stash
\`\`\`

---

## Resolving Merge Conflicts

When two branches change the same line, Git marks the conflict:

\`\`\`
<<<<<<< HEAD
const timeout = 5000;
=======
const timeout = 3000;
>>>>>>> feature/reduce-timeout
\`\`\`

You manually edit the file to keep what you want, then:
\`\`\`bash
git add <resolved-file>
git commit   # Git auto-generates a merge commit message
\`\`\`

Use \`git diff --staged\` to verify before committing.

---

## .gitignore

Keep secrets and build artifacts out of your repo. A typical Node.js \`.gitignore\`:

\`\`\`
node_modules/
.env
.env.local
dist/
build/
*.log
.DS_Store
\`\`\`

---

## Commands Engineers Forget

\`\`\`bash
git diff HEAD~1 HEAD         # what changed in last commit?
git reset --soft HEAD~1      # undo last commit, keep changes staged
git reset --hard HEAD~1      # DANGER: undo last commit, discard changes
git reflog                   # lifesaver: history of every HEAD move
git bisect start             # binary search through commits to find a bug
\`\`\`

**Pro tip:** \`git reflog\` has saved many engineers after a bad \`reset --hard\`. Everything is recoverable for about 90 days.
    `.trim(),
  },

  {
    slug: 'binary-search-patterns',
    title: 'Binary Search: Beyond the Basics',
    content: `
## Binary Search Is Not Just "Find a Number"

Most engineers know binary search in theory but fumble the implementation. Product company interviewers love binary search problems because they're simple to state, hard to get right, and reveal whether you think precisely.

The key insight: binary search works on any **monotonic** search space — not just sorted arrays.

---

## The Template (Memorize This)

\`\`\`javascript
function binarySearch(lo, hi, condition) {
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (condition(mid)) {
      hi = mid;          // answer is mid or to the left
    } else {
      lo = mid + 1;      // answer is to the right
    }
  }
  return lo;             // lo === hi at convergence
}
\`\`\`

This template finds the *leftmost* position where \`condition\` is true. Adjust \`hi = mid - 1\` / \`lo = mid\` for rightmost.

---

## Classic Binary Search

\`\`\`javascript
function search(nums, target) {
  let lo = 0, hi = nums.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (nums[mid] === target) return mid;
    else if (nums[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}
// Time: O(log n) | Space: O(1)
\`\`\`

Off-by-one errors are the #1 bug here. Practice until \`lo <= hi\` vs \`lo < hi\` is muscle memory.

---

## Search in Rotated Sorted Array

The array \`[4,5,6,7,0,1,2]\` was once sorted, then rotated. The trick: one half is always sorted.

\`\`\`javascript
function searchRotated(nums, target) {
  let lo = 0, hi = nums.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (nums[mid] === target) return mid;

    // Left half is sorted
    if (nums[lo] <= nums[mid]) {
      if (target >= nums[lo] && target < nums[mid]) hi = mid - 1;
      else lo = mid + 1;
    } else {
      // Right half is sorted
      if (target > nums[mid] && target <= nums[hi]) lo = mid + 1;
      else hi = mid - 1;
    }
  }
  return -1;
}
// Time: O(log n) | Space: O(1)
\`\`\`

---

## Find First and Last Occurrence

Run two separate binary searches — one biased left, one biased right.

\`\`\`javascript
function searchRange(nums, target) {
  return [findFirst(nums, target), findLast(nums, target)];
}

function findFirst(nums, target) {
  let lo = 0, hi = nums.length - 1, result = -1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (nums[mid] === target) { result = mid; hi = mid - 1; } // keep going left
    else if (nums[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return result;
}

function findLast(nums, target) {
  let lo = 0, hi = nums.length - 1, result = -1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (nums[mid] === target) { result = mid; lo = mid + 1; } // keep going right
    else if (nums[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return result;
}
// Time: O(log n) | Space: O(1)
\`\`\`

---

## Binary Search on the Answer

This is the advanced pattern. Instead of searching in an array, you binary search on a *range of possible answers*.

**Example: Find minimum in rotated sorted array**
\`\`\`javascript
function findMin(nums) {
  let lo = 0, hi = nums.length - 1;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (nums[mid] > nums[hi]) lo = mid + 1; // min is in right half
    else hi = mid;                           // min is mid or left
  }
  return nums[lo];
}
// Time: O(log n) | Space: O(1)
\`\`\`

**Identifying binary search on answer problems:** "Find minimum X such that condition C holds." The answer space is monotonic — once C is true, it stays true for larger X.

---

## Common Mistakes

1. **Integer overflow:** Use \`Math.floor((lo + hi) / 2)\` not \`(lo + hi) / 2\` in languages with overflow (Java: \`lo + (hi - lo) / 2\`)
2. **Infinite loop:** If you set \`lo = mid\` without \`hi = mid - 1\`, you can loop forever when \`lo + 1 === hi\`
3. **Wrong boundary:** Always trace through with a 2-3 element example before submitting

Binary search problems are 10-15% of Flipkart/Amazon rounds. Get the template right and they become free points.
    `.trim(),
  },

  {
    slug: 'linked-lists-dsa',
    title: 'Linked Lists: Patterns That Actually Come Up in Interviews',
    content: `
## What Interviewers Are Testing

Linked list problems test pointer manipulation and the ability to think in "chains." They're also a proxy for attention to detail — null pointer errors are easy to make and hard to debug under pressure. Product companies (especially Amazon) love them.

---

## Structure First

\`\`\`javascript
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}
// Create: 1 -> 2 -> 3 -> null
const head = new ListNode(1, new ListNode(2, new ListNode(3)));
\`\`\`

---

## Pattern 1: Slow & Fast Pointers (Floyd's Algorithm)

Move one pointer one step at a time, another two steps. They meet if there's a cycle.

**Detect a cycle:**
\`\`\`javascript
function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}
// Time: O(n) | Space: O(1)
\`\`\`

**Find middle of linked list:**
\`\`\`javascript
function findMiddle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow; // slow is at middle when fast reaches end
}
// For even-length: returns second middle node
\`\`\`

---

## Pattern 2: Reverse a Linked List

Arguably the most important linked list operation. Know it cold.

\`\`\`javascript
function reverseList(head) {
  let prev = null, curr = head;
  while (curr) {
    const next = curr.next; // save next before overwriting
    curr.next = prev;       // reverse the pointer
    prev = curr;            // move prev forward
    curr = next;            // move curr forward
  }
  return prev; // prev is the new head
}
// Time: O(n) | Space: O(1)
\`\`\`

Trace through manually: \`1->2->3->null\` becomes \`null<-1<-2<-3\`. Return value is 3.

**Recursive version (for when they ask):**
\`\`\`javascript
function reverseListRecursive(head) {
  if (!head || !head.next) return head;
  const newHead = reverseListRecursive(head.next);
  head.next.next = head;
  head.next = null;
  return newHead;
}
// Time: O(n) | Space: O(n) stack frames
\`\`\`

---

## Pattern 3: Merge Two Sorted Lists

\`\`\`javascript
function mergeTwoLists(l1, l2) {
  const dummy = new ListNode(0); // dummy head simplifies edge cases
  let curr = dummy;
  while (l1 && l2) {
    if (l1.val <= l2.val) { curr.next = l1; l1 = l1.next; }
    else { curr.next = l2; l2 = l2.next; }
    curr = curr.next;
  }
  curr.next = l1 || l2; // attach remaining list
  return dummy.next;
}
// Time: O(m + n) | Space: O(1)
\`\`\`

The **dummy node** trick avoids special-casing an empty list — use it whenever you're building a new list.

---

## Doubly Linked Lists

Each node has both \`next\` and \`prev\` pointers. Enables O(1) deletion when you have a reference to the node (no need to traverse for predecessor). Used in LRU Cache implementation — a very common system design + coding combo question.

\`\`\`javascript
class DListNode {
  constructor(key, val) {
    this.key = key; this.val = val;
    this.prev = null; this.next = null;
  }
}
\`\`\`

---

## Common Edge Cases to Always Check

1. Empty list (\`head === null\`)
2. Single node list
3. Two node list (for cycle/reverse)
4. Even vs odd length (for middle-finding)

Before coding, ask: "Should I handle null input?" — shows maturity. In product companies, defensive code matters.
    `.trim(),
  },

  {
    slug: 'trees-and-bst',
    title: 'Trees & BST: Complete Interview Guide',
    content: `
## Trees Are Everywhere in Interviews

File systems, DOM, JSON, org charts — trees are in everything. More importantly, tree problems test recursion and the ability to think about problems in terms of subproblems. Master this and your interview pass rate goes up significantly.

---

## The Node Structure

\`\`\`javascript
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val; this.left = left; this.right = right;
  }
}
\`\`\`

---

## DFS Traversals — Recursive

\`\`\`javascript
function inorder(root, result = []) {
  if (!root) return result;
  inorder(root.left, result);
  result.push(root.val);   // LEFT → ROOT → RIGHT
  inorder(root.right, result);
  return result;
}
// For a BST: inorder gives sorted output

function preorder(root, result = []) {
  if (!root) return result;
  result.push(root.val);   // ROOT → LEFT → RIGHT
  preorder(root.left, result);
  preorder(root.right, result);
  return result;
}

function postorder(root, result = []) {
  if (!root) return result;
  postorder(root.left, result);
  postorder(root.right, result);
  result.push(root.val);   // LEFT → RIGHT → ROOT
  return result;
}
\`\`\`

---

## BFS — Level Order with Queue

\`\`\`javascript
function levelOrder(root) {
  if (!root) return [];
  const result = [], queue = [root];
  while (queue.length) {
    const levelSize = queue.length;
    const level = [];
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}
// Time: O(n) | Space: O(w) where w = max width of tree
\`\`\`

---

## BST Properties and Operations

In a valid BST: every node in the left subtree < root < every node in right subtree.

**Search / Insert:**
\`\`\`javascript
function searchBST(root, val) {
  if (!root || root.val === val) return root;
  return val < root.val ? searchBST(root.left, val) : searchBST(root.right, val);
}

function insertBST(root, val) {
  if (!root) return new TreeNode(val);
  if (val < root.val) root.left = insertBST(root.left, val);
  else root.right = insertBST(root.right, val);
  return root;
}
// Time: O(h) where h = height. O(log n) balanced, O(n) skewed.
\`\`\`

---

## Height and Diameter

\`\`\`javascript
function height(root) {
  if (!root) return 0;
  return 1 + Math.max(height(root.left), height(root.right));
}

// Diameter = longest path between any two nodes
let maxDiameter = 0;
function diameter(root) {
  if (!root) return 0;
  const left = diameter(root.left);
  const right = diameter(root.right);
  maxDiameter = Math.max(maxDiameter, left + right); // path through this node
  return 1 + Math.max(left, right);
}
\`\`\`

---

## Lowest Common Ancestor (LCA)

A classic Amazon question. The LCA of two nodes p and q is the deepest node that has both as descendants.

\`\`\`javascript
function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left && right) return root; // p in left subtree, q in right
  return left || right;           // both in same subtree
}
// Time: O(n) | Space: O(h) stack
\`\`\`

---

## What Interviewers Ask Most

1. Serialize/deserialize a binary tree (level-order BFS approach)
2. Validate a BST (pass min/max bounds through recursion)
3. Path sum problems (DFS with running sum)
4. Symmetric tree / same tree (recursive comparison)

When you see a tree problem: reach for recursion first, think about what you need from left subtree and right subtree, combine.
    `.trim(),
  },

  {
    slug: 'stacks-queues-heaps',
    title: 'Stacks, Queues, and Heaps: Interview Essentials',
    content: `
## Three Data Structures, Dozens of Problems

Stacks, queues, and heaps each have a core property that makes them useful for specific problem shapes. Once you see the pattern, the implementation follows naturally.

---

## Stack — LIFO (Last In, First Out)

Use a stack when: you need to process things in reverse order, match pairs (parentheses), or track "previous state" as you move forward.

**Valid Parentheses**
\`\`\`javascript
function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const ch of s) {
    if ('({['.includes(ch)) stack.push(ch);
    else if (stack.pop() !== map[ch]) return false;
  }
  return stack.length === 0;
}
// Time: O(n) | Space: O(n)
\`\`\`

**Min Stack (O(1) getMin)**
\`\`\`javascript
class MinStack {
  constructor() { this.stack = []; this.minStack = []; }
  push(val) {
    this.stack.push(val);
    const min = this.minStack.length ? Math.min(val, this.minStack.at(-1)) : val;
    this.minStack.push(min);
  }
  pop() { this.stack.pop(); this.minStack.pop(); }
  top() { return this.stack.at(-1); }
  getMin() { return this.minStack.at(-1); }
}
\`\`\`

---

## Queue — FIFO (First In, First Out)

Queues power BFS. In JavaScript, use an array with \`push\`/\`shift\` (or a proper deque for performance).

**BFS is just: put root in queue, process level by level.**

See the Trees article for the BFS template — it directly uses a queue.

---

## Deque — Sliding Window Maximum

A deque (double-ended queue) maintains a window of candidates — you can push/pop from both ends.

\`\`\`javascript
function maxSlidingWindow(nums, k) {
  const deque = []; // stores indices, front = largest
  const result = [];
  for (let i = 0; i < nums.length; i++) {
    // Remove elements outside window
    while (deque.length && deque[0] < i - k + 1) deque.shift();
    // Remove elements smaller than nums[i] from back
    while (deque.length && nums[deque.at(-1)] < nums[i]) deque.pop();
    deque.push(i);
    if (i >= k - 1) result.push(nums[deque[0]]);
  }
  return result;
}
// Time: O(n) | Space: O(k)
\`\`\`

---

## Heap — Priority Queue

JavaScript has no built-in heap. In interviews, either implement a min-heap or describe the operations and use a sorted structure as a proxy.

**Top K Elements using a min-heap of size K:**
\`\`\`javascript
// Concept (use a min-heap library in actual code):
// 1. Maintain a min-heap of size k
// 2. For each element: if larger than heap top, pop and push new element
// 3. After all elements: heap contains top k largest

// In Python: heapq.nlargest(k, nums)  — mention this in interviews
// In Java: PriorityQueue with Comparator

// JavaScript manual min-heap push/pop is O(log k)
// Total: O(n log k) — much better than O(n log n) full sort
\`\`\`

**Kth Largest Element:** Same pattern — heap of size k.

**Merge K Sorted Lists:** Min-heap stores one node per list; always extract the minimum and push the next node from that list.

---

## When to Use What

| Problem | Use |
|---|---|
| Undo/redo, expression evaluation | Stack |
| BFS, task scheduling | Queue |
| Sliding window max/min | Deque |
| Top K, kth largest/smallest | Heap |
| Next greater/smaller element | Monotonic Stack |

---

## Monotonic Stack (Bonus Pattern)

A stack that's always increasing or decreasing. Used for "next greater element" problems.

\`\`\`javascript
function nextGreaterElement(nums) {
  const result = new Array(nums.length).fill(-1);
  const stack = []; // stores indices
  for (let i = 0; i < nums.length; i++) {
    while (stack.length && nums[stack.at(-1)] < nums[i]) {
      result[stack.pop()] = nums[i];
    }
    stack.push(i);
  }
  return result;
}
// Time: O(n) — each element pushed/popped once
\`\`\`

These patterns show up frequently in Swiggy, Zomato, and Amazon interviews.
    `.trim(),
  },

  {
    slug: 'hashing-and-sorting',
    title: 'Hashing & Sorting: Making O(n²) Into O(n)',
    content: `
## The Two Tools That Eliminate Brute Force

Hash maps turn O(n) lookup into O(1). Sorting turns chaos into structure that enables binary search, two pointers, and other efficient algorithms. Together, they're behind most "optimized" interview solutions.

---

## Hash Maps: Common Patterns

**Frequency Counting**
\`\`\`javascript
function charFrequency(s) {
  const freq = {};
  for (const ch of s) freq[ch] = (freq[ch] || 0) + 1;
  return freq;
}
// Use case: anagram detection, most frequent element
\`\`\`

**Two Sum (the canonical hash map problem)**
\`\`\`javascript
function twoSum(nums, target) {
  const seen = new Map(); // value → index
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) return [seen.get(complement), i];
    seen.set(nums[i], i);
  }
  return [];
}
// Time: O(n) | Space: O(n)
// vs O(n²) brute force — this is the answer interviewers want
\`\`\`

**Anagram Detection**
\`\`\`javascript
function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = {};
  for (const ch of s) count[ch] = (count[ch] || 0) + 1;
  for (const ch of t) {
    if (!count[ch]) return false;
    count[ch]--;
  }
  return true;
}
// Time: O(n) | Space: O(1) — alphabet size is constant
\`\`\`

---

## Sorting Algorithms — What You Need to Know

| Algorithm | Time (avg) | Time (worst) | Space | Stable? | When to use |
|---|---|---|---|---|---|
| Bubble Sort | O(n²) | O(n²) | O(1) | Yes | Never in prod; explain concepts |
| Selection Sort | O(n²) | O(n²) | O(1) | No | Never in prod |
| Insertion Sort | O(n²) | O(n²) | O(1) | Yes | Small arrays, nearly sorted |
| Merge Sort | O(n log n) | O(n log n) | O(n) | Yes | When stability needed |
| Quick Sort | O(n log n) | O(n²) | O(log n) | No | In-place, fast in practice |
| Counting Sort | O(n + k) | O(n + k) | O(k) | Yes | Small integer range |

In interviews: know Merge Sort and Quick Sort in code. Know the rest conceptually.

**Merge Sort (Divide & Conquer)**
\`\`\`javascript
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return [...result, ...left.slice(i), ...right.slice(j)];
}
// Time: O(n log n) | Space: O(n) — the extra space is the merge step
\`\`\`

---

## Counting Sort — When k is Small

\`\`\`javascript
function countingSort(arr, maxVal) {
  const count = new Array(maxVal + 1).fill(0);
  for (const num of arr) count[num]++;
  const result = [];
  for (let i = 0; i <= maxVal; i++) {
    while (count[i]-- > 0) result.push(i);
  }
  return result;
}
// Time: O(n + k) | Space: O(k)
// Use when: sorting ages, scores, characters (limited range)
\`\`\`

---

## The Decision Framework

When you see an interview problem, mentally check:
1. Does it need fast lookup/existence check? → Hash map
2. Does grouping/counting elements help? → Hash map
3. Would sorting enable two pointers or binary search? → Sort first
4. Is the value range small (like 0-100)? → Counting sort

**Common trap:** Interviewers will give you an O(n²) problem that becomes O(n) with a hash map. Always think "can I trade space for time here?"
    `.trim(),
  },

  {
    slug: 'graphs-algorithms',
    title: 'Graph Algorithms: BFS, DFS, and the Patterns Behind Them',
    content: `
## Graphs Are Everywhere Once You See Them

Social networks, maps, package dependencies, web crawlers — most real-world problems are graphs. Interviewers at Flipkart, Amazon, and Google regularly use graphs to test problem-modeling skills as much as algorithmic knowledge.

---

## Graph Representations

**Adjacency List (prefer this):**
\`\`\`javascript
// Undirected graph: 0-1, 0-2, 1-3
const graph = {
  0: [1, 2],
  1: [0, 3],
  2: [0],
  3: [1]
};
// Space: O(V + E) — efficient for sparse graphs
\`\`\`

**Adjacency Matrix:**
\`\`\`javascript
// matrix[i][j] = 1 means edge from i to j
const matrix = [
  [0, 1, 1, 0],
  [1, 0, 0, 1],
  [1, 0, 0, 0],
  [0, 1, 0, 0]
];
// Space: O(V²) — good for dense graphs, O(1) edge lookup
\`\`\`

For interviews, default to adjacency list unless the problem says "grid" (then it's an implicit matrix graph).

---

## BFS — Shortest Path, Level-by-Level

BFS explores all neighbors before going deeper. Use it for: shortest path in unweighted graph, level-order traversal, finding connected components.

\`\`\`javascript
function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const order = [];

  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const neighbor of (graph[node] || [])) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return order;
}
// Time: O(V + E) | Space: O(V)
\`\`\`

**BFS shortest path:**
\`\`\`javascript
function shortestPath(graph, start, end) {
  if (start === end) return 0;
  const visited = new Set([start]);
  const queue = [[start, 0]]; // [node, distance]
  while (queue.length) {
    const [node, dist] = queue.shift();
    for (const neighbor of (graph[node] || [])) {
      if (neighbor === end) return dist + 1;
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, dist + 1]);
      }
    }
  }
  return -1; // unreachable
}
\`\`\`

---

## DFS — Cycle Detection, Topological Sort, Islands

DFS goes as deep as possible before backtracking. Use it for: cycle detection, topological ordering, connected components, path existence.

\`\`\`javascript
function dfs(graph, node, visited = new Set()) {
  if (visited.has(node)) return;
  visited.add(node);
  console.log(node);
  for (const neighbor of (graph[node] || [])) {
    dfs(graph, neighbor, visited);
  }
}
// Time: O(V + E) | Space: O(V) stack
\`\`\`

**Number of Islands (classic grid DFS):**
\`\`\`javascript
function numIslands(grid) {
  let count = 0;
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === '1') { dfsIsland(grid, r, c); count++; }
    }
  }
  return count;
}

function dfsIsland(grid, r, c) {
  if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] !== '1') return;
  grid[r][c] = '0'; // mark visited by mutating
  dfsIsland(grid, r+1, c); dfsIsland(grid, r-1, c);
  dfsIsland(grid, r, c+1); dfsIsland(grid, r, c-1);
}
// Time: O(m × n) | Space: O(m × n) worst case stack
\`\`\`

---

## Union-Find (Disjoint Set Union)

Efficiently answers: "Are these two nodes in the same connected component?"

\`\`\`javascript
class UnionFind {
  constructor(n) { this.parent = Array.from({length: n}, (_, i) => i); }
  find(x) {
    if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]); // path compression
    return this.parent[x];
  }
  union(x, y) { this.parent[this.find(x)] = this.find(y); }
  connected(x, y) { return this.find(x) === this.find(y); }
}
// find/union: nearly O(1) amortized with path compression
\`\`\`

---

## Dijkstra's Algorithm (Concept)

For weighted graphs, BFS gives wrong shortest paths. Dijkstra uses a min-heap: always explore the node with the smallest known distance next.

- Time: O((V + E) log V) with a priority queue
- Works only for non-negative edge weights
- For negative weights: use Bellman-Ford

In interviews, stating this clearly is often enough. Full implementation is usually only asked for senior roles.
    `.trim(),
  },

  {
    slug: 'dynamic-programming-guide',
    title: 'Dynamic Programming: From Confusion to Clarity',
    content: `
## Why DP Feels Hard (And How to Fix That)

Dynamic programming isn't magic — it's just recursion with caching, or building up a table of subproblem answers. The confusion comes from seeing solutions without understanding the *process* that generates them.

Here's the process. Use it every time.

---

## The 5-Step DP Framework

1. **Define the state:** What does dp[i] or dp[i][j] mean in English?
2. **Write the recurrence:** How does dp[i] relate to smaller subproblems?
3. **Identify base cases:** What's the smallest subproblem you can answer directly?
4. **Determine fill order:** Bottom-up means you compute smaller subproblems first.
5. **Extract the answer:** Is it dp[n]? max of dp array? Trace back for reconstruction?

---

## Memoization vs Tabulation

| | Memoization (Top-Down) | Tabulation (Bottom-Up) |
|---|---|---|
| Approach | Recursion + cache | Iterative + table |
| Space | Call stack + cache | Table only |
| When easier | Tree-shaped recursion | When you can define order cleanly |

Both give the same result. Interviewers accept either. Start with memoization (it's easier to reason about), then convert to tabulation if asked.

---

## Climbing Stairs (Classic DP)

\`\`\`javascript
// Memoization
function climbStairs(n, memo = {}) {
  if (n <= 2) return n;
  if (memo[n]) return memo[n];
  memo[n] = climbStairs(n - 1, memo) + climbStairs(n - 2, memo);
  return memo[n];
}

// Tabulation
function climbStairsDP(n) {
  const dp = [0, 1, 2];
  for (let i = 3; i <= n; i++) dp[i] = dp[i-1] + dp[i-2];
  return dp[n];
}
// Time: O(n) | Space: O(n) → can reduce to O(1) with two variables
\`\`\`

---

## 0/1 Knapsack

State: \`dp[i][w]\` = max value using first i items with capacity w.

\`\`\`javascript
function knapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = Array.from({length: n+1}, () => new Array(capacity+1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      dp[i][w] = dp[i-1][w]; // don't take item i
      if (weights[i-1] <= w) {
        dp[i][w] = Math.max(dp[i][w], values[i-1] + dp[i-1][w - weights[i-1]]);
      }
    }
  }
  return dp[n][capacity];
}
// Time: O(n × W) | Space: O(n × W), reducible to O(W)
\`\`\`

---

## Coin Change

State: \`dp[amount]\` = minimum coins to make that amount.

\`\`\`javascript
function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let amt = 1; amt <= amount; amt++) {
    for (const coin of coins) {
      if (coin <= amt) dp[amt] = Math.min(dp[amt], 1 + dp[amt - coin]);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}
// Time: O(amount × coins) | Space: O(amount)
\`\`\`

---

## Longest Common Subsequence (LCS)

State: \`dp[i][j]\` = LCS of first i chars of s1 and first j chars of s2.

\`\`\`javascript
function lcs(s1, s2) {
  const m = s1.length, n = s2.length;
  const dp = Array.from({length: m+1}, () => new Array(n+1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i-1] === s2[j-1]) dp[i][j] = 1 + dp[i-1][j-1];
      else dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
    }
  }
  return dp[m][n];
}
// Time: O(m × n) | Space: O(m × n)
\`\`\`

---

## Identifying DP Problems

Ask yourself:
1. "Can this problem be broken into overlapping subproblems?"
2. "Does the optimal answer to the whole problem depend on optimal answers to subproblems?" (optimal substructure)

If yes to both → DP. Common signals in the problem statement: "minimum/maximum ways," "count the number of," "is it possible to," "longest/shortest sequence."
    `.trim(),
  },

  {
    slug: 'backtracking-guide',
    title: 'Backtracking: The Systematic Brute Force',
    content: `
## What Backtracking Is

Backtracking is a refined brute force: explore all possible solutions by building them incrementally, and **abandon a path** (backtrack) as soon as you determine it can't lead to a valid solution. It's used when you need to find all solutions, or when there's no greedy/DP shortcut.

---

## The Universal Template

Every backtracking problem fits this shape:

\`\`\`javascript
function backtrack(current, choices, result) {
  // Base case: current is a complete solution
  if (isComplete(current)) {
    result.push([...current]); // copy — don't push reference
    return;
  }

  for (const choice of choices) {
    if (!isValid(choice, current)) continue; // prune

    current.push(choice);          // CHOOSE
    backtrack(current, choices, result); // EXPLORE
    current.pop();                 // UNCHOOSE (undo)
  }
}
\`\`\`

The "copy before pushing" step is the most common bug in backtracking code. Arrays are references — you must spread or slice.

---

## Subsets

\`\`\`javascript
function subsets(nums) {
  const result = [];
  function backtrack(start, current) {
    result.push([...current]); // every path is a valid subset
    for (let i = start; i < nums.length; i++) {
      current.push(nums[i]);
      backtrack(i + 1, current); // i+1 means no reuse
      current.pop();
    }
  }
  backtrack(0, []);
  return result;
}
// Time: O(2^n × n) | Space: O(n) recursion depth
// For [1,2,3]: returns [], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]
\`\`\`

---

## Permutations

\`\`\`javascript
function permutations(nums) {
  const result = [];
  function backtrack(current, remaining) {
    if (remaining.length === 0) { result.push([...current]); return; }
    for (let i = 0; i < remaining.length; i++) {
      current.push(remaining[i]);
      backtrack(current, [...remaining.slice(0, i), ...remaining.slice(i+1)]);
      current.pop();
    }
  }
  backtrack([], nums);
  return result;
}
// Time: O(n! × n) | n! permutations, each takes O(n) to copy
\`\`\`

---

## Combination Sum

\`\`\`javascript
function combinationSum(candidates, target) {
  const result = [];
  candidates.sort((a, b) => a - b); // sort enables pruning
  function backtrack(start, current, remaining) {
    if (remaining === 0) { result.push([...current]); return; }
    for (let i = start; i < candidates.length; i++) {
      if (candidates[i] > remaining) break; // prune: no point continuing
      current.push(candidates[i]);
      backtrack(i, current, remaining - candidates[i]); // i, not i+1 = reuse allowed
      current.pop();
    }
  }
  backtrack(0, [], target);
  return result;
}
\`\`\`

---

## N-Queens (Classic)

\`\`\`javascript
function solveNQueens(n) {
  const result = [];
  const cols = new Set(), diag1 = new Set(), diag2 = new Set();

  function backtrack(row, board) {
    if (row === n) { result.push(board.map(r => r.join(''))); return; }
    for (let col = 0; col < n; col++) {
      if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) continue;
      cols.add(col); diag1.add(row - col); diag2.add(row + col);
      board[row][col] = 'Q';
      backtrack(row + 1, board);
      board[row][col] = '.';
      cols.delete(col); diag1.delete(row - col); diag2.delete(row + col);
    }
  }

  const board = Array.from({length: n}, () => new Array(n).fill('.'));
  backtrack(0, board);
  return result;
}
\`\`\`

---

## How to Prune Effectively

1. **Sort input first** — lets you break early when candidates exceed remaining target
2. **Track used elements** — avoids duplicates in permutations
3. **Constraint propagation** — in N-Queens, track attacked columns/diagonals in O(1)

Pruning is what separates a "correct but TLE" backtracking from an accepted solution. Always ask: "Can I tell early that this branch can't succeed?"
    `.trim(),
  },

  {
    slug: 'resume-for-product-companies',
    title: 'Writing a Resume That Gets You Into Product Companies',
    content: `
## Why Service Company Resumes Get Rejected

Most engineers from TCS, Infosys, Wipro, and HCL write resumes that describe *activities*, not *impact*. A typical service company bullet: "Worked on Java microservices for a banking client." This tells the reader nothing about scale, complexity, or your contribution.

Product company recruiters at Amazon, Flipkart, Swiggy, and Razorpay scan 200+ resumes a day. They're looking for signals of ownership, scale, and measurable outcomes — in 6 seconds.

---

## The XYZ Formula (Google's Own Recommendation)

> Accomplished **[X]** by doing **[Y]**, resulting in **[Z]**

Examples:
- "Reduced API latency by 40% by migrating from REST polling to WebSockets, resulting in a 15% improvement in user session length"
- "Built an automated test suite (1,200 test cases) for the payment module, reducing production bug escape rate by 60%"
- "Led migration of 3 legacy batch jobs to Kafka-based streaming, reducing processing time from 4 hours to 11 minutes"

Notice: every bullet has a number. If you don't have a number, estimate conservatively. "Served ~500 daily active users" beats "built a user-facing feature."

---

## Quantifying Impact When You Think You Have None

| You think | You can actually say |
|---|---|
| "Maintained legacy code" | "Reduced technical debt by refactoring 8K lines of legacy Java into modular services" |
| "Fixed bugs" | "Resolved 30+ production issues, reducing critical ticket SLA breaches by 45%" |
| "Part of a 10-person team" | "Owned end-to-end delivery of the X module within a 10-engineer agile team" |
| "Worked on client project" | "Delivered features for a platform processing 2M daily transactions" |

The numbers are often available in logs, JIRA, or by asking your manager. Find them.

---

## 5 Resume Mistakes Engineers Make

1. **Listing technologies without context** — "Java, Spring, Hibernate, MySQL, AWS" means nothing without showing *what you built*
2. **Generic responsibilities** — "Participated in code reviews" → "Reviewed 200+ PRs, establishing coding standards adopted by a 15-person team"
3. **Missing GitHub/projects** — If you have a personal project, link it. A working side project on GitHub says more than 2 years of maintenance work
4. **Wrong length** — 1 page for 0-5 years experience, 2 pages max for senior. Not 3. Recruiters will not scroll
5. **No ATS-friendly formatting** — Avoid tables, text boxes, headers/footers. Use clean single-column layout. ATS (Applicant Tracking Systems) can't parse fancy templates

---

## Resume Structure That Works

\`\`\`
[Full Name]
[Email] | [Phone] | [LinkedIn] | [GitHub] | [City]

SUMMARY (2-3 lines)
Backend engineer with 4 years in Java/Spring, transitioning to product
engineering. Built scalable services handling 500K daily requests.
Looking for SDE-2 roles in high-growth product companies.

SKILLS
Languages: Java, Python, JavaScript
Frameworks: Spring Boot, Node.js, React
Databases: MySQL, Redis, MongoDB
Tools: Git, Docker, Kubernetes, Jenkins, AWS (EC2, S3, RDS)

EXPERIENCE
[Company Name] | SDE-1 | Jan 2021 - Present
• Accomplished X by doing Y, resulting in Z
• Accomplished X by doing Y, resulting in Z

PROJECTS
[Project Name] | GitHub link
• What it does, stack used, scale/usage

EDUCATION
[Degree] | [College] | [Year] | CGPA (if above 7.5)
\`\`\`

---

## ATS Keywords for Top Indian Product Companies

- **Amazon:** ownership, scalability, data-driven, distributed systems, Java, Python, AWS
- **Flipkart:** microservices, Kafka, high availability, REST, Spring
- **Swiggy/Zomato:** real-time, low latency, geolocation, Node.js, Go
- **Razorpay:** payments, PCI-DSS, security, API design, PostgreSQL

Mirror the language in the job description. ATS scores resumes by keyword density before a human even sees it.
    `.trim(),
  },

  {
    slug: 'star-method-behavioral',
    title: 'The STAR Method: Behavioral Interviews Done Right',
    content: `
## Why Behavioral Rounds Get Underestimated

Engineers from service companies often dismiss behavioral rounds. "It's just talking about myself — I'll wing it." Then they ramble for 5 minutes without a clear answer, or give a story with no measurable outcome.

Product companies — especially Amazon — weight behavioral rounds heavily. At Amazon, each question maps to a Leadership Principle. A weak behavioral round can reject you regardless of your coding performance.

---

## STAR — The Framework

| Letter | What it means | Time to spend |
|---|---|---|
| **S** — Situation | Context: project, team, timeline | 10-15 seconds |
| **T** — Task | Your specific responsibility | 10-15 seconds |
| **A** — Action | What *you* did (not "we") | 60-90 seconds |
| **R** — Result | Measurable outcome + what you learned | 30 seconds |

The A is where most time goes. Be specific about your decisions, trade-offs, and reasoning.

---

## Amazon's Leadership Principles You'll Be Asked About

You don't need to memorize all 16, but internalize these 8 — they cover 90% of questions:

1. **Customer Obsession** — "Tell me about a time you went above and beyond for a user/customer"
2. **Ownership** — "Tell me about a time you took responsibility for something outside your role"
3. **Dive Deep** — "Tell me about a time you used data to make a decision"
4. **Deliver Results** — "Tell me about a time you delivered under pressure or with constraints"
5. **Earn Trust** — "Tell me about a time you had a conflict with a teammate"
6. **Invent and Simplify** — "Tell me about a time you found a simpler solution to a complex problem"
7. **Bias for Action** — "Tell me about a time you made a decision with incomplete information"
8. **Are Right, A Lot** — "Tell me about a time you disagreed with your manager"

---

## Preparing Your Story Bank

Write 8-10 stories from your actual work. Map each story to multiple principles — a good story can answer 3-4 different questions.

**Story template to fill out:**
\`\`\`
Title: "The Kafka Migration"
Situation: Q3 2022, our batch job was failing 2-3 times a week under load
Task: I was asked to investigate and fix it (or propose an alternative)
Action:
  - Dug into logs, found root cause: MySQL lock contention on batch inserts
  - Proposed Kafka-based async pipeline instead of batch
  - Built a PoC in 2 weeks, presented to team lead
  - Led 6-week migration with zero downtime plan
Result:
  - Processing time dropped from 4h to 11 minutes
  - Zero batch failures in 6 months post-migration
  - Pattern adopted for 2 other services by adjacent team
Principles it covers: Ownership, Deliver Results, Invent and Simplify
\`\`\`

---

## 10 Common Questions and the Principle Behind Each

1. "Tell me about yourself" → Narrative arc: where you've been, what you've built, where you're going
2. "Biggest failure / mistake" → Earn Trust — own it fully, show learning
3. "Conflict with a teammate" → Earn Trust — resolution without blame
4. "Time you influenced without authority" → Leadership without title
5. "Time you had to learn something quickly" → Adaptability
6. "Time you pushed back on requirements" → Are Right, A Lot
7. "Most complex technical problem" → Dive Deep
8. "Time you improved a process" → Invent and Simplify
9. "Time you delivered with limited resources" → Deliver Results
10. "Why product companies / why [this company]?" → Genuine motivation — research the company's engineering blog

---

## Tips for Non-"Impressive" Backgrounds

You don't need Amazon-scale experience to answer behavioral questions well. A story about fixing a broken deploy pipeline in a 20-person company can show Ownership and Dive Deep just as well as a big-corp story.

What matters: clear reasoning, your specific actions, and honest results. Interviewers know the difference between someone who lived through a challenge vs someone reading a template answer.

Prepare your 8-10 stories thoroughly. Practice saying them aloud — not reading them. Time yourself to 2 minutes per answer.
    `.trim(),
  },

  {
    slug: 'how-to-get-referrals',
    title: 'Getting Referrals from Product Company Engineers',
    content: `
## Why Referrals Matter More Than You Think

At Flipkart, Amazon, and Swiggy, a referred candidate is 2-3x more likely to get an interview call compared to a cold application. Referrals move your resume from a pile of thousands to a stack of dozens — directly reviewed by a recruiter.

More importantly: at many Indian product companies, referred candidates get a faster interview process (often 2-3 weeks instead of 2-3 months).

---

## Step 1: Find the Right People

**LinkedIn search (the most effective method):**
1. Go to LinkedIn Search → People
2. Filter by: Company = "Amazon India" / "Flipkart" / "Swiggy"
3. Filter by: School = your college name
4. Filter by: Role keyword = "SDE" / "Backend Engineer"

You're looking for engineers who graduated from your college, worked at similar service companies early in their career, and made the switch. They're the most likely to help — they understand exactly where you are.

Also check:
- Your college's alumni Facebook groups or WhatsApp groups
- Alumni chapters on LinkedIn
- Former classmates who joined product companies

---

## Step 2: The Cold Message Template

The biggest mistake: sending a long message about yourself. Engineers are busy. Keep it under 100 words.

\`\`\`
Hi [Name],

I came across your profile while looking for [Company] engineers from
[Your College]. I've been a backend engineer at [Your Company] for
[X years] working on [brief: Java microservices / Node.js APIs], and I'm
targeting SDE-[level] roles at [Company].

Would really value a 15-minute chat about your experience there, and if
you feel comfortable, a referral would mean a lot.

Happy to share my resume. Thanks either way — no pressure at all.

[Your Name] | [LinkedIn] | [GitHub if strong]
\`\`\`

Key elements: same college = instant trust. "No pressure" = removes awkwardness. Short = gets read.

---

## Step 3: What to Say in the Chat

If they agree to talk, don't waste it asking "what's the interview process like" (that's on Glassdoor). Ask questions that help them remember you:

1. "What's the most interesting engineering challenge you've worked on there?"
2. "Is there something you wish you'd prepared better before joining?"
3. "What does a good day look like on your team?"

Then ask for the referral naturally: "Based on what you've told me, I think I'd be a good fit. Would you be comfortable referring me for [role]? I'll share my updated resume."

---

## Step 4: Building a Referral Pipeline (Not Just One Bet)

Don't pin everything on one person. Aim for:
- 5-10 alumni conversations per week
- Track in a simple spreadsheet: Name, Company, Status, Last Contacted

Most people say yes to a conversation. Of those, 50-70% will refer you if your resume is strong. Numbers game — start early, stay consistent.

---

## LinkedIn Search Techniques

\`\`\`
Site-specific search (Google works too):
site:linkedin.com/in "SDE" "Flipkart" "VIT" OR "BITS" OR "NIT"

LinkedIn Boolean:
"software engineer" AND "Swiggy" AND "Infosys" (career trajectory filter)
\`\`\`

Use the "Alumni" tab on your college's LinkedIn page — it's underutilized and lets you filter by company directly.

---

## What If You Have No Network At All?

1. **Open source contributions** — a merged PR in a project used by engineers at your target company is a conversation starter
2. **Twitter/X** — many product engineers are active; engaging with their posts genuinely (not "DM for referral") builds real connection
3. **Engineering blogs** — comment thoughtfully on Flipkart/Swiggy/Amazon Tech Blog posts; the authors sometimes respond

The common thread: give value before asking. Share a relevant article, compliment specific work, ask a genuine question. Transactional messages get ignored; genuine curiosity gets responses.
    `.trim(),
  },

  {
    slug: 'system-design-basics-hld',
    title: 'System Design Basics: How to Approach Any HLD Question',
    content: `
## What System Design Rounds Are Actually Testing

Interviewers aren't expecting a perfect design. They're testing: can you think at scale, can you make trade-offs explicitly, and can you communicate complex ideas clearly? A structured approach shows all three, even if your design has gaps.

---

## The 5-Step Framework (45 Minutes)

### Step 1: Clarify Requirements (5 minutes)

Before drawing anything, ask:
- **Functional:** What does the system *do*? (Core features only)
- **Non-functional:** Read-heavy or write-heavy? What's the scale? SLA for latency? Availability requirements?
- **Out of scope:** Explicitly state what you're NOT designing

Example: "For a URL shortener — I'll design the core shorten and redirect flow. I'll skip analytics dashboards and billing for now. Is that okay?"

### Step 2: Estimate Scale (3-5 minutes)

Back-of-envelope math signals senior thinking:

\`\`\`
Monthly active users: 100M
Daily active users: 10M (assume 10% of MAU)
Requests per second: 10M / 86,400 ≈ 116 RPS (read)
Peak: 5× average ≈ 580 RPS
Storage: if each record is 1KB × 100M users = 100GB
Bandwidth: 580 × 1KB = 580 KB/s
\`\`\`

This forces the right database and infra choices.

### Step 3: Design High-Level Components (15-20 minutes)

Sketch the main boxes: clients, API gateway, application servers, databases, caches, queues. Show data flow.

**Standard components:**
- **API Gateway:** single entry point, handles auth, rate limiting, routing
- **Application Servers:** stateless, horizontally scalable
- **Database:** primary read/write
- **Cache (Redis):** for hot data, session state
- **Message Queue (Kafka/SQS):** async processing, decouple services
- **CDN:** static assets, reduce origin load

### Step 4: Deep Dive on 1-2 Critical Components (10-15 minutes)

Let the interviewer guide this. Common deep dives:
- Database schema design
- Caching strategy
- How to handle high write throughput
- Consistency vs availability trade-offs

### Step 5: Address Bottlenecks (5 minutes)

- Single points of failure → add replicas
- Database write bottleneck → sharding, read replicas
- Hot cache keys → consistent hashing
- Service failures → circuit breakers, retries with exponential backoff

---

## Horizontal vs Vertical Scaling

| | Vertical (Scale Up) | Horizontal (Scale Out) |
|---|---|---|
| How | Bigger machine (more RAM/CPU) | More machines |
| Limit | Physical hardware limit | Theoretically unlimited |
| Cost | Expensive, diminishing returns | Cheaper at scale |
| Failure | Single point of failure | Resilient |
| Complexity | Simple | Requires load balancing, distributed state |

Product companies default to horizontal scaling. Your designs should too.

---

## Load Balancers

Distribute traffic across servers. Types:
- **Round-robin:** requests cycle through servers evenly
- **Least connections:** send to server with fewest active connections
- **IP hash:** same client always goes to same server (useful for session affinity)

---

## Caching Basics

- Cache read-heavy data that's expensive to compute or query
- Cache hit ratio is the key metric — aim for 90%+
- Cache invalidation is hard — always discuss TTL and eviction policy (LRU)

---

## CDN

Content Delivery Networks cache static assets (images, JS, CSS) at edge locations near users. Reduces latency from 200ms (Mumbai → origin) to 20ms (Mumbai → local edge). Always mention CDN for user-facing read-heavy systems.
    `.trim(),
  },

  {
    slug: 'scalability-fundamentals',
    title: 'Scalability: Designing Systems That Handle Millions of Users',
    content: `
## The Journey from 100 to 100 Million Users

Every large system started small. Understanding the scaling journey shows you can think ahead — a critical signal for senior roles at product companies.

---

## The Scaling Ladder

**Stage 1: Single Server (0-1K users)**
One machine runs everything: app + database. Simple. No DevOps complexity.

**Stage 2: Separate Database (1K-100K users)**
Move database to its own server. Application servers can now scale independently from the database.

**Stage 3: Read Replicas (100K-1M users)**
Most apps are read-heavy (80-90% reads). Add read replicas — copies of your primary DB that serve read traffic. Writes still go to primary.

**Stage 4: Caching Layer (continuing at 1M+)**
Add Redis/Memcached in front of the database for hot data. Cache-aside pattern: check cache first, fall back to DB on miss, populate cache.

**Stage 5: Multiple App Servers + Load Balancer**
Stateless application servers behind a load balancer. Any server can handle any request. Horizontal scaling becomes straightforward.

**Stage 6: Database Sharding (10M+ users)**
Split the database horizontally. Each shard holds a subset of data.

---

## Stateless Services: The Key to Horizontal Scaling

A stateless service stores no user state in memory. Each request contains all the information needed to handle it (via JWT, or by fetching state from a shared store like Redis).

Why it matters: if your server holds session state in memory, you can't route a user to a different server. You're stuck with one server (sticky sessions). Stateless removes this constraint.

\`\`\`
Stateful: Client → Server A (has session) — can't move to Server B
Stateless: Client (sends token) → Any Server → Redis (has session)
\`\`\`

---

## Database Sharding

Sharding splits data across multiple database instances. Common strategies:

| Strategy | How | Pros | Cons |
|---|---|---|---|
| Range-based | Users A-M on shard 1, N-Z on shard 2 | Simple | Hot shards if data skewed |
| Hash-based | shard = hash(user_id) % N | Even distribution | Resharding is painful |
| Directory-based | Lookup table maps key → shard | Flexible | Lookup table is a bottleneck |

**Consistent hashing** solves the resharding problem — adding a new shard only requires moving ~1/N of the data.

---

## Load Balancing Algorithms

| Algorithm | When to use |
|---|---|
| Round-robin | Equal server capacity, uniform requests |
| Weighted round-robin | Servers with different capacities |
| Least connections | Long-lived connections (WebSockets) |
| IP hash | Need session affinity (use Redis instead) |
| Consistent hashing | Distributing to cache nodes, databases |

---

## Autoscaling

Cloud providers (AWS Auto Scaling, GCP Managed Instance Groups) can automatically add/remove servers based on CPU usage, request rate, or custom metrics. This handles traffic spikes (flash sales on Flipkart, midnight batch reports, viral content on social media) without manual intervention.

**Key metrics to autoscale on:**
- CPU utilization > 70% → scale out
- Request queue depth growing → scale out
- CPU < 20% for 10 minutes → scale in (save cost)

---

## The Numbers to Know (Back-of-Envelope Reference)

\`\`\`
1 million seconds ≈ 11.5 days
1 day = 86,400 seconds
Network: same DC = 0.5ms, cross-region = 150ms
SSD random read: 0.1ms | HDD: 10ms | RAM: 0.1μs
Bandwidth: 1Gbps = 125MB/s
\`\`\`

Knowing these lets you do quick math in interviews — a signal that you've thought about scale before.
    `.trim(),
  },

  {
    slug: 'caching-design-patterns',
    title: 'Caching Patterns: Cache-Aside, Write-Through, Write-Back',
    content: `
## Why Caching Exists

Databases are slow (1-10ms per query). Memory is fast (0.1 microseconds). For data that's read frequently and doesn't change every millisecond, caching is the highest-ROI optimization in a system. Every product company system design interview expects you to know the patterns.

---

## Pattern 1: Cache-Aside (Lazy Loading)

The application code manages the cache. On a read:
1. Check cache first
2. If cache miss: query database, store result in cache, return to client

\`\`\`
Read: Client → App → Cache (miss) → DB → App → Cache.set() → Client
Read: Client → App → Cache (hit) → Client
Write: Client → App → DB.write() → Cache.delete() [invalidate]
\`\`\`

**Pros:** Cache only contains actually-requested data. No wasted memory.
**Cons:** Cache misses on first request (cold start). Risk of stale data if cache isn't invalidated on write.

**When to use:** Read-heavy workloads, data that can be slightly stale (user profiles, product catalog).

---

## Pattern 2: Write-Through

Every write goes to cache AND database simultaneously.

\`\`\`
Write: Client → App → Cache.write() AND DB.write() simultaneously → Client
Read: Client → App → Cache (always hit after first write) → Client
\`\`\`

**Pros:** Cache is always fresh. No stale reads.
**Cons:** Higher write latency (two writes per operation). Cache may fill with data that's never read ("write amplification").

**When to use:** When read-after-write consistency is critical (shopping cart, inventory).

---

## Pattern 3: Write-Behind (Write-Back)

Write goes to cache immediately; database write is deferred (async, batched).

\`\`\`
Write: Client → App → Cache.write() → Client (fast response)
                  → [async] → DB.write() (eventually)
\`\`\`

**Pros:** Very fast writes. Database gets batched writes (efficient).
**Cons:** Risk of data loss if cache crashes before DB write. More complex.

**When to use:** High-write workloads where you can tolerate eventual consistency (view counts, analytics, IoT sensor data).

---

## Pattern 4: Read-Through

Cache sits in front of the database. Application only talks to the cache. On a miss, the cache itself fetches from the database.

**Difference from cache-aside:** The *cache library* manages the DB fetch, not your application code.

---

## Eviction Policies

When cache is full, old entries must be removed. Common policies:

| Policy | Logic | Best for |
|---|---|---|
| LRU (Least Recently Used) | Evict item not accessed longest | General purpose |
| LFU (Least Frequently Used) | Evict item accessed fewest times | Long-lived caches |
| TTL (Time To Live) | Evict after fixed time period | Data with natural staleness |
| FIFO | Evict oldest entry | Simple, not usually optimal |

Redis supports LRU, LFU, and TTL. Use TTL for session tokens, LRU for general object caching.

---

## Cache Stampede Problem

When a popular cache key expires, hundreds of requests simultaneously hit the database. Solution options:

1. **Mutex lock:** First thread to get a miss acquires a lock, others wait. Simple but adds latency.
2. **Probabilistic early expiry:** Randomly refresh cache slightly before TTL expires, spreading the load.
3. **Staggered TTLs:** Add jitter (randomness) to TTL values so keys don't expire simultaneously.

---

## Redis vs Memcached

| Feature | Redis | Memcached |
|---|---|---|
| Data structures | Strings, lists, sets, hashes, sorted sets | Strings only |
| Persistence | Yes (RDB snapshots, AOF log) | No |
| Replication | Yes | No |
| Atomic operations | Yes (INCR, LPUSH) | Limited |
| Use in interviews | Default choice | Mention when you need pure simplicity |

Default to Redis in all system design answers unless the interviewer specifically asks about trade-offs.
    `.trim(),
  },

  {
    slug: 'cap-theorem-explained',
    title: 'CAP Theorem: The Trade-off Every Backend Engineer Must Understand',
    content: `
## What CAP Actually Says

CAP Theorem (Brewer's Theorem) states that a distributed system can only guarantee **two of the three** properties simultaneously:

- **C — Consistency:** Every read receives the most recent write or an error
- **A — Availability:** Every request receives a response (not necessarily the latest data)
- **P — Partition Tolerance:** The system continues operating even when network messages are dropped between nodes

The key insight that makes CAP practical: **network partitions (P) are unavoidable** in any real distributed system. Networks fail. Packets get dropped. So the real choice is: **during a partition, do you prioritize Consistency or Availability?**

---

## The Three Combinations

### CP — Consistency + Partition Tolerance

During a network partition, the system refuses requests rather than return stale data.

**Behavior:** "I'd rather give you an error than give you wrong data."

**Real databases:** HBase, Zookeeper, MongoDB (default config), etcd

**When to use:** Financial transactions, inventory management, distributed locks — anywhere stale data is dangerous.

---

### AP — Availability + Partition Tolerance

During a partition, the system keeps responding, but different nodes may return different (stale) data.

**Behavior:** "I'll give you an answer, but it might not be the latest."

**Real databases:** Cassandra, CouchDB, DynamoDB (default), Riak

**When to use:** Social media feeds, product catalog, DNS — where eventual consistency is acceptable and uptime matters more.

---

### CA — Consistency + Availability

This is only achievable without partitions — which means a single-node system. Once you have multiple nodes, you have potential partitions.

**Real databases:** Traditional single-node PostgreSQL, MySQL (non-clustered)

**In practice:** CA systems are the "I haven't distributed this yet" scenario. Every distributed system must handle P.

---

## Real Databases Mapped to CAP

| Database | Category | Why |
|---|---|---|
| PostgreSQL | CA (single node) / CP (clustered) | ACID, strong consistency |
| MySQL | CA (single node) | ACID |
| Cassandra | AP | Eventual consistency by design |
| DynamoDB | AP (default) / CP (strong consistency reads) | Tunable consistency |
| MongoDB | CP | Primary election during partition |
| Redis | CP | Master-replica, writes go to master only |
| Zookeeper | CP | Used for distributed coordination |

---

## PACELC — Beyond CAP

CAP only covers behavior *during* a partition. PACELC extends it: **even without a partition (E)**, you must choose between **Latency (L)** and **Consistency (C)**.

\`\`\`
PACELC: If Partition → (Availability vs Consistency)
        Else (normal ops) → (Latency vs Consistency)
\`\`\`

Example: Cassandra is PA/EL — prioritizes availability during partitions, and low latency (at the cost of consistency) during normal operation.

Mentioning PACELC in an interview signals depth beyond the textbook answer.

---

## How to Answer CAP Questions in Interviews

When asked "what database would you use for X?":

1. State your consistency requirement ("This is financial data — I need strong consistency")
2. State your availability requirement ("But downtime during a partition is acceptable for ~10 seconds")
3. Conclude: "So I'd go with PostgreSQL (CP), accepting that it returns errors rather than stale data during a network split"

This is the framework interviewers at Razorpay and PhonePe particularly appreciate, because payments require exactly this level of thinking.
    `.trim(),
  },

  {
    slug: 'sql-vs-nosql-when-to-use',
    title: 'SQL vs NoSQL: Choosing the Right Database',
    content: `
## The Question Behind the Question

Interviewers don't ask "SQL or NoSQL?" because they want to know which is better. They ask to see if you can reason about trade-offs given constraints — a core product engineering skill.

---

## When to Use SQL (Relational Databases)

**Choose SQL when:**
- Your data has clear relationships and a well-defined schema
- You need ACID transactions (Atomicity, Consistency, Isolation, Durability)
- You need complex queries with JOINs, aggregations, filtering
- Data integrity is critical (financial records, inventory, user accounts)

**Best options:** PostgreSQL (default choice), MySQL, SQLite

**Example use cases:**
- E-commerce orders (one order → many items → one user → one address)
- Banking transactions
- HR management systems

\`\`\`sql
-- Example: find users with orders above Rs.10,000 in last 30 days
SELECT u.name, SUM(o.amount) as total
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE o.created_at > NOW() - INTERVAL '30 days'
GROUP BY u.id
HAVING SUM(o.amount) > 10000;
\`\`\`

This query is trivial in SQL. In NoSQL, you'd need to denormalize data heavily or run multiple queries.

---

## When to Use NoSQL

NoSQL covers four very different database types. Each solves a different problem.

### Key-Value Stores (Redis, DynamoDB)
**Use for:** Caching, sessions, real-time leaderboards, rate limiting
**Access pattern:** Always access by a single key
**Not for:** Complex queries, relationships

### Document Stores (MongoDB, Firestore)
**Use for:** Content management, user profiles, product catalogs, event logging
**Access pattern:** Flexible schema, nested objects, no fixed columns
**Not for:** Frequent cross-document JOINs

### Column-Family Stores (Cassandra, HBase)
**Use for:** Time-series data, IoT sensor data, activity logs, analytics at massive scale
**Access pattern:** Write-heavy, append-mostly, partition by a primary key
**Not for:** Ad-hoc queries, low latency reads on non-partitioned keys

### Graph Databases (Neo4j, Amazon Neptune)
**Use for:** Social networks (who follows whom), recommendation engines, fraud detection
**Access pattern:** Traverse relationships ("friends of friends who liked X")
**Not for:** Everything else

---

## The Decision Framework for Interviews

\`\`\`
1. Is your schema fixed and relational?
   YES → SQL (PostgreSQL)

2. Do you need ACID transactions?
   YES → SQL. If distributed transactions: CockroachDB, Spanner

3. Is it truly massive scale (>1M writes/sec) with simple access patterns?
   YES → Cassandra (wide-column) or DynamoDB (key-value)

4. Is it flexible/evolving schema (different fields per record)?
   YES → MongoDB

5. Is it primarily caching or session storage?
   YES → Redis

6. Are the relationships the data? (social graph, fraud rings)
   YES → Neo4j
\`\`\`

---

## Common Interview Answer Structure

When asked "What database for a ride-sharing app like Ola?":

> "I'd use multiple databases for different use cases. User profiles, ride history, and payment records go in PostgreSQL — they need ACID compliance and clear relational structure. Driver locations (high write throughput, time-series) go in Cassandra or a specialized geo-database. Session tokens and caching go in Redis. This is a polyglot persistence approach — use the right tool for each access pattern."

That answer shows: you know the trade-offs, you don't just pick one database for everything, and you know why.
    `.trim(),
  },

  {
    slug: 'solid-principles-guide',
    title: "SOLID Principles: Writing Code That Doesn't Break at Scale",
    content: `
## Why SOLID Matters in Product Company Interviews

Service company code often works — but doesn't scale to teams of 50 engineers modifying the same codebase. SOLID principles are how teams stay productive as codebases grow. Interviewers at senior levels (SDE-2/3) expect you to understand these instinctively.

---

## S — Single Responsibility Principle

> A class should have only one reason to change.

\`\`\`javascript
// BAD: This class does too much
class UserService {
  createUser(data) { /* DB insert */ }
  sendWelcomeEmail(user) { /* SMTP logic */ }
  generateReport() { /* PDF creation */ }
}

// GOOD: Each class owns one responsibility
class UserService { createUser(data) { /* DB only */ } }
class EmailService { sendWelcomeEmail(user) { /* email only */ } }
class ReportService { generateReport() { /* report only */ } }
\`\`\`

When email logic changes, you don't touch UserService.

---

## O — Open/Closed Principle

> Open for extension, closed for modification.

\`\`\`javascript
// BAD: Adding a new payment type requires modifying this function
function processPayment(type, amount) {
  if (type === 'card') { /* ... */ }
  else if (type === 'upi') { /* ... */ }
  // Add new type → modify this function → risk breaking existing logic
}

// GOOD: Add new payment type by extending, not modifying
class PaymentProcessor {
  process(amount) { throw new Error('implement me'); }
}
class CardPayment extends PaymentProcessor {
  process(amount) { /* card logic */ }
}
class UPIPayment extends PaymentProcessor {
  process(amount) { /* UPI logic */ }
}
// New payment? Add a new class. Existing code untouched.
\`\`\`

---

## L — Liskov Substitution Principle

> Subclasses must be usable in place of their parent class without breaking the program.

\`\`\`javascript
// BAD: Square extends Rectangle but breaks expectations
class Rectangle {
  setWidth(w) { this.width = w; }
  setHeight(h) { this.height = h; }
  area() { return this.width * this.height; }
}
class Square extends Rectangle {
  setWidth(w) { this.width = w; this.height = w; } // violates Rectangle contract
}

// GOOD: Use a Shape interface; Square and Rectangle implement it independently
class Shape { area() {} }
class Rectangle extends Shape { area() { return this.width * this.height; } }
class Square extends Shape { area() { return this.side * this.side; } }
\`\`\`

---

## I — Interface Segregation Principle

> Don't force classes to implement methods they don't need.

\`\`\`javascript
// BAD: One fat interface
class Worker {
  work() {}
  eat() {}  // robots don't eat
}

// GOOD: Segregate interfaces
class Workable { work() {} }
class Eatable { eat() {} }
class HumanWorker extends Workable { work() {}; eat() {} }
class RobotWorker extends Workable { work() {} } // doesn't implement eat
\`\`\`

---

## D — Dependency Inversion Principle

> High-level modules should not depend on low-level modules. Both should depend on abstractions.

\`\`\`javascript
// BAD: OrderService is tightly coupled to MySQLDatabase
class OrderService {
  constructor() {
    this.db = new MySQLDatabase(); // hardcoded dependency
  }
  createOrder(order) { this.db.save(order); }
}

// GOOD: Inject the dependency; any DB that implements save() works
class OrderService {
  constructor(database) {
    this.db = database; // injected — could be MySQL, MongoDB, or a mock
  }
  createOrder(order) { this.db.save(order); }
}
// Usage:
const service = new OrderService(new MySQLDatabase());
// Or in tests:
const service = new OrderService(new MockDatabase());
\`\`\`

DIP enables dependency injection — the basis of frameworks like Spring (Java) and NestJS (Node.js).

---

## In Interviews

When asked about code quality or design, walk through SOLID with one concrete example from your work. "I refactored X using SRP — separated notification logic from the core service — and it made unit testing 10x easier" is far more compelling than reciting definitions.
    `.trim(),
  },

  {
    slug: 'essential-design-patterns',
    title: '10 Design Patterns Every Senior Engineer Knows',
    content: `
## Patterns Are Vocabulary

Design patterns are named solutions to common software design problems. Knowing them lets you communicate a complex design decision in one word. "Use the Observer pattern here" conveys a full architecture to another engineer instantly.

---

## 1. Singleton
**What:** Only one instance of a class exists in the application.
**When:** Database connection pool, configuration manager, logger.
\`\`\`javascript
class Config {
  static instance = null;
  static getInstance() {
    if (!Config.instance) Config.instance = new Config();
    return Config.instance;
  }
}
\`\`\`
**Caution:** Makes testing hard. Prefer dependency injection in modern code.

---

## 2. Factory
**What:** A method/class that creates objects without exposing creation logic.
**When:** You need to create different subtypes based on input.
\`\`\`javascript
class NotificationFactory {
  static create(type) {
    if (type === 'email') return new EmailNotification();
    if (type === 'sms') return new SMSNotification();
    if (type === 'push') return new PushNotification();
    throw new Error('Unknown type');
  }
}
\`\`\`

---

## 3. Observer
**What:** Objects subscribe to events; the subject notifies all subscribers when state changes.
**When:** Event systems, UI state management (React's useEffect), real-time notifications.
\`\`\`javascript
class EventEmitter {
  constructor() { this.listeners = {}; }
  on(event, fn) { (this.listeners[event] = this.listeners[event] || []).push(fn); }
  emit(event, data) { (this.listeners[event] || []).forEach(fn => fn(data)); }
}
\`\`\`

---

## 4. Strategy
**What:** Define a family of algorithms, encapsulate each, and make them interchangeable at runtime.
**When:** Sorting strategy, payment processing, compression algorithms.
\`\`\`javascript
class Sorter {
  constructor(strategy) { this.strategy = strategy; }
  sort(data) { return this.strategy(data); }
}
const quickSorter = new Sorter((d) => d.sort()); // swap strategy without changing Sorter
\`\`\`

---

## 5. Decorator
**What:** Add behavior to objects dynamically by wrapping them.
**When:** Middleware in Express/Koa, adding logging/auth/caching to functions.
\`\`\`javascript
function withLogging(fn) {
  return function(...args) {
    console.log('Calling with', args);
    const result = fn(...args);
    console.log('Result:', result);
    return result;
  };
}
const loggedAdd = withLogging((a, b) => a + b);
\`\`\`

---

## 6. Command
**What:** Encapsulate a request as an object — supports undo, queuing, logging.
**When:** Undo/redo (text editors), task queues, macro recording.
\`\`\`javascript
class Command {
  execute() {}
  undo() {}
}
class AddItemCommand extends Command {
  execute() { this.cart.add(this.item); }
  undo() { this.cart.remove(this.item); }
}
\`\`\`

---

## 7. Adapter
**What:** Convert the interface of a class into another interface clients expect.
**When:** Integrating third-party libraries, legacy system migrations.
\`\`\`javascript
// Old interface: oldPay(amount, currency)
// New interface: pay({ amount, currency })
class PaymentAdapter {
  constructor(oldPayment) { this.old = oldPayment; }
  pay({ amount, currency }) { this.old.oldPay(amount, currency); }
}
\`\`\`

---

## 8. Facade
**What:** Provide a simplified interface to a complex subsystem.
**When:** SDK design, library wrappers, API gateways.
\`\`\`javascript
class OrderFacade {
  placeOrder(items, user) {
    inventory.check(items);        // complex subsystem
    payment.charge(user);          // complex subsystem
    fulfillment.ship(items, user); // complex subsystem
  }
}
// Caller only sees one method
\`\`\`

---

## 9. Template Method
**What:** Define the skeleton of an algorithm in a base class; subclasses fill in specific steps.
**When:** Data pipelines, report generation with varying formats, ETL jobs.
\`\`\`javascript
class DataProcessor {
  process() { // template method
    this.extract(); this.transform(); this.load();
  }
  extract() { throw new Error('implement'); }
  transform() { throw new Error('implement'); }
  load() { throw new Error('implement'); }
}
\`\`\`

---

## 10. Proxy
**What:** Provide a placeholder that controls access to another object.
**When:** Lazy loading, caching, access control, rate limiting.
\`\`\`javascript
const cacheProxy = new Proxy(expensiveObject, {
  get(target, prop) {
    if (prop in cache) return cache[prop];
    cache[prop] = target[prop];
    return cache[prop];
  }
});
\`\`\`

In interviews, when asked "how would you add caching to this service without modifying it?" — the answer is a Proxy or Decorator.
    `.trim(),
  },

  {
    slug: 'design-url-shortener',
    title: 'System Design: URL Shortener (TinyURL)',
    content: `
## Why URL Shortener Is the Perfect First System Design Problem

It's scoped, concrete, and touches all the fundamentals: API design, database schema, scale estimation, caching, and distributed ID generation. Every engineer preparing for product companies should be able to design this in 45 minutes cold.

---

## Step 1: Requirements

**Functional:**
- Given a long URL, generate a short URL (e.g., tinyurl.com/abc123)
- Redirect short URL to original long URL
- Optional: custom short URLs, expiry dates

**Non-Functional:**
- Read-heavy (100:1 read to write ratio — every short URL gets clicked many times)
- Low latency redirects (<10ms p99)
- High availability (5 nines — 99.999%)
- URLs should never collide

**Out of scope:** User accounts, analytics dashboard, billing

---

## Step 2: Scale Estimation

\`\`\`
New URLs per day: 100 million
Redirects per day: 10 billion (100:1 ratio)
Redirects per second: 10B / 86,400 ≈ 115,000 RPS (peak ~600K RPS)

Storage:
- Each record: long URL (2KB) + short URL (7 bytes) + metadata = ~2.5KB
- 100M records/day × 365 × 5 years = ~180 billion records → too much
- Realistic: store only 1 year of active URLs = ~100B × 2.5KB = 250TB
\`\`\`

At 600K redirects/second, a single database cannot handle this. Caching is mandatory.

---

## Step 3: API Design

\`\`\`
POST /api/v1/shorten
Body: { longUrl: "https://...", customSlug?: "mylink", expiresAt?: "2026-12-31" }
Response: { shortUrl: "https://tinyurl.com/abc123" }

GET /{shortCode}
Response: 301 Redirect to longUrl
\`\`\`

Use **301 (Permanent Redirect)** if the mapping never changes — browsers cache it, reducing server load. Use **302 (Temporary Redirect)** if you want to track every click — browsers re-request each time.

---

## Step 4: Encoding Algorithm (Base62)

A 7-character base62 string gives 62^7 ≈ 3.5 trillion unique codes. More than enough.

\`\`\`javascript
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function toBase62(id) {
  let result = '';
  while (id > 0) {
    result = CHARS[id % 62] + result;
    id = Math.floor(id / 62);
  }
  return result.padStart(7, CHARS[0]);
}
// Encode a unique auto-increment ID from DB into a 7-char short code
\`\`\`

**Alternative:** MD5/SHA256 hash of long URL, take first 7 characters. Risk: collisions. Handle with retry + conflict check.

---

## Step 5: Database Schema

\`\`\`sql
CREATE TABLE urls (
  id          BIGINT PRIMARY KEY AUTO_INCREMENT,
  short_code  VARCHAR(10) UNIQUE NOT NULL,
  long_url    TEXT NOT NULL,
  user_id     BIGINT,
  created_at  TIMESTAMP DEFAULT NOW(),
  expires_at  TIMESTAMP,
  click_count BIGINT DEFAULT 0
);

CREATE INDEX idx_short_code ON urls(short_code);
\`\`\`

---

## Step 6: Architecture

\`\`\`
Write path:
Client → API Gateway → URL Service → ID Generator (Snowflake/DB sequence)
                                    → Encode to Base62
                                    → Store in MySQL
                                    → Return short URL

Read path (hot):
Client → API Gateway → Redis Cache (short_code → long_url, TTL=24h)
                    → (on miss) MySQL → cache + redirect

Read path (cold):
Client → API Gateway → MySQL → 301 Redirect
\`\`\`

**Cache strategy:** Cache-aside. Cache the short_code → long_url mapping. 90%+ cache hit rate expected for popular URLs.

---

## Step 7: Handling Scale

- **Multiple app servers** behind a load balancer (stateless — any server can handle any request)
- **Read replicas** for the database — redirect reads go to replicas, writes go to primary
- **CDN** for redirect responses — cache the 301 at the edge for ultra-popular links
- **Rate limiting** on the POST endpoint — prevent abuse (max 100 URLs/min per IP)

---

## What Interviewers Probe Next

- "What if two users shorten the same long URL?" — Store duplicate rows (simple) or deduplicate on long_url (query before insert)
- "How would you handle custom slugs?" — Validate uniqueness, store in same table
- "How would you add analytics?" — Write click events to Kafka, aggregate asynchronously — don't block the redirect path
    `.trim(),
  },

  {
    slug: 'design-chat-system',
    title: 'System Design: Real-Time Chat (WhatsApp)',
    content: `
## The Challenge of Real-Time

Chat systems are popular interview questions because they combine: real-time bidirectional communication, message persistence, online presence, and scale (WhatsApp handles 100 billion messages per day). Understanding this design demonstrates practical distributed systems knowledge.

---

## Step 1: Requirements

**Functional:**
- 1-1 messaging
- Group chats (up to 500 members)
- Message delivery status (sent, delivered, read)
- Online/offline presence
- Push notifications for offline users
- Message history

**Non-Functional:**
- Low latency (<100ms for delivery)
- High availability (chat apps need 99.99%+)
- Eventual consistency acceptable (slight delay before delivery is fine)
- Scale: 500M daily active users, 100B messages/day

---

## Step 2: Long Polling vs WebSockets

| Approach | How | Latency | Server Cost |
|---|---|---|---|
| HTTP Polling | Client polls every few seconds | High (up to polling interval) | High (many unnecessary requests) |
| Long Polling | Server holds connection until message arrives | Medium | Medium |
| WebSockets | Full-duplex persistent connection | Low | Low per user |
| SSE | Server-to-client only | Low | Low |

**Choose WebSockets** for chat. Once connected, both client and server can send messages at any time without overhead of new HTTP requests.

---

## Step 3: High-Level Architecture

\`\`\`
Client <── WebSocket ──> Chat Server
                              │
                         Message Queue (Kafka)
                              │
                     ┌────────┴────────┐
              Message Store       Notification Service
             (Cassandra)           (APNS/FCM)
\`\`\`

**Chat Servers:** Stateful — each server holds active WebSocket connections. A user connects to one chat server. When they send a message to another user, the message may need to be routed to a *different* chat server where the recipient is connected.

**Message Queue:** Kafka decouples message delivery from storage. Chat server publishes to Kafka; separate consumer writes to Cassandra.

---

## Step 4: Message Storage Schema

Cassandra is ideal for messages: write-heavy, time-series access, high throughput.

\`\`\`
messages table:
  partition key: conversation_id
  clustering key: message_id (time-ordered, UUID)
  columns: sender_id, content, type, status, created_at

conversations table:
  user_id (partition key)
  conversation_id
  last_message_preview
  unread_count
  updated_at
\`\`\`

Query pattern: "Give me the last 50 messages in conversation X" — perfect for Cassandra's partition + clustering key model.

---

## Step 5: Online Presence

Use Redis to track who's online:

\`\`\`
Redis key: "presence:{user_id}"
Value: timestamp of last heartbeat
TTL: 30 seconds

Client sends heartbeat every 15s.
If key expires → user is offline.
\`\`\`

On status change: publish to a presence channel, subscribers (friends) get notified via their WebSocket connection.

---

## Step 6: Group Chats

For groups with 500 members:
- When User A sends a message, the Chat Server receives it
- Fan-out: queue a delivery task for each member
- For large groups, **fan-out on read** is better: store one message, each user queries "messages in group since my last read time"
- Threshold: small groups (<50) → fan-out on write; large groups → fan-out on read

---

## Step 7: Push Notifications

When recipient is offline:
1. Chat Server detects recipient's WebSocket is not connected (check presence Redis key)
2. Message goes to Notification Service
3. Notification Service sends via APNs (iOS) or FCM (Android)

Include only metadata in the push (not full message content) for end-to-end encrypted chats.

---

## End-to-End Encryption (Concept)

- Each device generates a public-private key pair
- Public keys are stored on the server; private keys never leave the device
- Sender encrypts message with recipient's public key
- Only recipient's private key can decrypt
- Server sees only encrypted ciphertext — cannot read messages

Signal Protocol (used by WhatsApp, Signal) is the standard implementation. In interviews, you only need to describe this concept, not implement it.
    `.trim(),
  },

  {
    slug: 'design-uber',
    title: 'System Design: Uber / Ride Sharing',
    content: `
## Why Uber Is a Great System Design Problem

Ride sharing combines real-time location tracking, matching algorithms, state machines, surge pricing, and multiple data stores — each chosen for specific access patterns. It's a systems design interview favorite at Ola, Rapido, Swiggy (delivery), and any company with real-time logistics.

---

## Step 1: Requirements

**Functional:**
- Rider requests a ride with pickup + destination
- System finds and matches a nearby available driver
- Real-time location tracking for driver and rider
- Trip state management (requested → accepted → in-progress → completed)
- Fare calculation and payment
- Surge pricing during high demand

**Non-Functional:**
- Location updates every 3-5 seconds per driver
- Driver matching latency < 2 seconds
- High availability (real money and safety involved)
- Scale: 500K concurrent rides, 5M active drivers globally

---

## Step 2: Geolocation — Geohashing

How do you find drivers within 5km of a rider efficiently? You can't query latitude/longitude directly — it requires expensive range scans.

**Geohashing:** Divide the world into a grid. Each cell has a string hash (e.g., "ttnn" = a ~40km² cell in Mumbai). Nearby locations share a prefix.

\`\`\`
Driver location: lat 19.0760, lng 72.8777
Geohash: "te7ud" (Mumbai area, precision 5 = ~5km radius)

To find nearby drivers:
1. Compute rider's geohash
2. Get the 8 neighboring cells + center cell
3. Query for available drivers in those 9 cells
\`\`\`

Use Redis with geospatial commands (GEOADD, GEORADIUS) — it handles this natively.

---

## Step 3: Driver Location Updates

Every driver's app sends a location ping every 4 seconds.

\`\`\`
At 500K active drivers: 500K / 4 = 125K location writes/second
\`\`\`

Architecture:
\`\`\`
Driver App → Location Service → Kafka → Location Processor
                                             │
                                        Redis (current location)
                                        Cassandra (location history for analytics)
\`\`\`

Write to Kafka first (fast, durable buffer). Location Processor consumes and updates Redis. Cassandra gets the full history for route reconstruction and analytics.

---

## Step 4: Driver Matching Algorithm

\`\`\`
1. Rider requests ride
2. Get rider's geohash
3. Query Redis for available drivers in nearby geohash cells
4. Sort by: distance + driver rating + estimated pickup time
5. Send offer to top candidate
6. If no acceptance in 10s, offer to next candidate
7. Once accepted, send driver details to rider
\`\`\`

This is "supply-demand matching." Keep the matching logic simple first — in interviews, depth of reasoning matters more than algorithmic complexity.

---

## Step 5: Trip State Machine

\`\`\`
REQUESTED → DRIVER_ASSIGNED → DRIVER_ARRIVING → TRIP_STARTED → TRIP_COMPLETED
     ↓              ↓                                                 ↓
  CANCELLED      CANCELLED                                        FARE_CALCULATED
                                                                       ↓
                                                                    PAYMENT_DONE
\`\`\`

State transitions are write-heavy, need ACID guarantees (a driver shouldn't be assigned to two trips simultaneously). Store in PostgreSQL with row-level locking.

---

## Step 6: Surge Pricing

Surge multiplier = f(demand / supply) in a given geohash cell.

\`\`\`
surge_multiplier = max(1.0, demand_last_5min / available_drivers)
Round to nearest 0.5x: 1.0, 1.5, 2.0, 2.5, 3.0 (capped)
\`\`\`

Compute every 5 minutes per geohash cell. Store in Redis with 5-minute TTL. Ride pricing service reads from cache.

---

## Step 7: Database Choices

| Data | Database | Why |
|---|---|---|
| Driver current location | Redis | Sub-millisecond reads, geospatial support |
| Trip records (active) | PostgreSQL | ACID, state machine transitions |
| Historical trips | Cassandra | Append-only, time-series, massive volume |
| Location history | Cassandra | Same — write heavy, time-ordered |
| User profiles, payments | PostgreSQL | Relational integrity |
| Surge pricing cache | Redis | Fast read, TTL-based expiry |

---

## What Interviewers Ask Next

- "What if a driver's app crashes mid-trip?" — State machine recovery: trip remains TRIP_STARTED, rider app continues tracking via last known location, driver re-connects and resumes
- "How do you handle payment failures?" — Saga pattern: compensating transactions (release driver, refund partial) with idempotent retries
- "How do you scale to global?" — Regional routing, data residency requirements (India data stays in India), CDN for static assets
    `.trim(),
  },
];

// ─── Combined export ──────────────────────────────────────────────────────────
export const ARTICLES = [
  ...ARTICLES_FE_BE,
  ...ARTICLES_DEVOPS_DA,
  ...ARTICLES_SDE,
];
