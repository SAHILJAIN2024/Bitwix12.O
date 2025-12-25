import { motion } from 'framer-motion';

const teams = [
  {
    title: "Contact and Management Team",
    members: [
      {
        name: "Piyush Singh",
        role: "Help Desk Support",
        imageUrl: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=256&h=256",
      },
      {
        name: "Nemish Nagaria",
        role: "Logistics Head",
        imageUrl: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=256&h=256",
      },
    ],
  },
  {
    title: "Marketing Team",
    members: [
      {
        name: "Priyanshu Aishwar",
        role: "Instagram Manager",
        imageUrl: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=256&h=256",
      },
      {
        name: "Aditi Agrawal",
        role: "Promotions",
        imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=256&h=256",
      },
    ],
  },
  {
    title: "Anchoring Team",
    members: [
      {
        name: "Ashu ",
        role: "Anchor",
        imageUrl: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=256&h=256",
      },
      {
        name: "Shruti Tiwari",
        role: "Anchor",
        imageUrl: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=256&h=256",
      },
    ],
  },
  {
    title: "Activity Team",
    members: [
      {
        name: "Rashi Rajoriya",
        role: "Activity Coordinator",
        imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=256&h=256",
      },
      {
        name: "Piyush Gautam",
        role: "Logistics Head",
        imageUrl: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=256&h=256",
      }
      
    ],
  },
  {
    title: "Registration Team",
    members: [
      {
        name: "Vansh Pratap Singh Jadon",
        role: "Registration Head",
        imageUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=256&h=256",
      },
      {
        name: "Kanika Jain",
        role: "Registration Head",
        imageUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=256&h=256",
      },
    ],
  },
 
  {
    title: "Website Team",
    members: [
      {
        name: "Sahil Jain",
        role: "Developer",
        imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=256&h=256",
      },
      {
        name: "Tanishq Shivhare",
        role: "Developer",
        imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=256&h=256",
      },
    ],
  },
 
  
];

export default function Team() {
  return (
    <section id="team" className="py-24">
      <div className="max-w-full mx-auto px-30">
        <div className="mb-16">
          <h2 className="text-4xl font-bold">Organizing Team</h2>
          <p className="mt-4 text-gray-400">
            The teams powering <span className="text-indigo-400">BITWIX12.O</span>
          </p>
        </div>

        <div className="space-y-16 grid grid-cols-3">
          {teams.map((team) => (
            <div key={team.title}>
              <h3 className="text-2xl font-semibold mb-6 text-indigo-400">
                {team.title}
              </h3>

              <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {team.members.map((member) => (
                  <motion.li
                    key={member.name}
                    whileHover={{ scale: 1.07 }}
                    className="flex items-center gap-6"
                  >
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="h-16 w-16 rounded-full ring-2 ring-indigo-400/40"
                    />
                    <div>
                      <h4 className="font-semibold">{member.name}</h4>
                      <p className="text-indigo-400 text-sm">
                        {member.role}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
