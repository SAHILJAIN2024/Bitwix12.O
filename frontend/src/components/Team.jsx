import { motion } from 'framer-motion';

const people = [
  {
    name: 'Leslie Alexander',
    role: 'Event Lead',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=256&h=256',
  },
  {
    name: 'Michael Foster',
    role: 'Technical Coordinator',
    imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=256&h=256',
  },
];

export default function Team() {
  return (
    <section id="team" className="py-24">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-3 gap-16">
        <div>
          <h2 className="text-4xl font-bold">Organizing Team</h2>
          <p className="mt-4 text-gray-400">The force behind BITWIX12.O</p>
        </div>

        <ul className="lg:col-span-2 grid sm:grid-cols-2 gap-10">
          {people.map((p) => (
            <motion.li
              key={p.name}
              whileHover={{ scale: 1.07 }}
              className="flex items-center gap-6"
            >
              <img
                src={p.imageUrl}
                alt={p.name}
                className="h-16 w-16 rounded-full ring-2 ring-indigo-400/40"
              />
              <div>
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-indigo-400 text-sm">{p.role}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}