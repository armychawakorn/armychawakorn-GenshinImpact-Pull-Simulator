'use client'
import { useState } from 'react';
import Image from 'next/image';

interface Character {
  name: string;
  rarity: number;
}

const rateUpCharacter = 'Nahida';

const characters = [
  { name: "Albedo", rarity: 5 },
  { name: "Alhaitham", rarity: 5 },
  { name: "Aloy", rarity: 5 },
  { name: "Amber", rarity: 4 },
  { name: "Arataki Itto", rarity: 5 },
  { name: "Baizhu", rarity: 5 },
  { name: "Barbara", rarity: 4 },
  { name: "Beidou", rarity: 4 },
  { name: "Bennett", rarity: 4 },
  { name: "Candace", rarity: 4 },
  { name: "Charlotte", rarity: 4 },
  { name: "Chongyun", rarity: 4 },
  { name: "Collei", rarity: 4 },
  { name: "Cyno", rarity: 5 },
  { name: "Dehya", rarity: 5 },
  { name: "Diluc", rarity: 5 },
  { name: "Diona", rarity: 4 },
  { name: "Dori", rarity: 4 },
  { name: "Eula", rarity: 5 },
  { name: "Faruzan", rarity: 4 },
  { name: "Fischl", rarity: 4 },
  { name: "Freminet", rarity: 4 },
  { name: "Furina", rarity: 5 },
  { name: "Ganyu", rarity: 5 },
  { name: "Gorou", rarity: 4 },
  { name: "Hu Tao", rarity: 5 },
  { name: "Jean", rarity: 5 },
  { name: "Kaedehara Kazuha", rarity: 5 },
  { name: "Kaeya", rarity: 4 },
  { name: "Ayaka", rarity: 5 },
  { name: "Ayato", rarity: 5 },
  { name: "Kaveh", rarity: 4 },
  { name: "Keqing", rarity: 5 },
  { name: "Kirara", rarity: 4 },
  { name: "Klee", rarity: 5 },
  { name: "Sara", rarity: 4 },
  { name: "Kuki Shinobu", rarity: 4 },
  { name: "Layla", rarity: 4 },
  { name: "Lisa", rarity: 4 },
  { name: "Lynette", rarity: 4 },
  { name: "Lyney", rarity: 5 },
  { name: "Mika", rarity: 4 },
  { name: "Mona", rarity: 5 },
  { name: "Nahida", rarity: 5 },
  { name: "Nilou", rarity: 5 },
  { name: "Ningguang", rarity: 4 },
  { name: "Noelle", rarity: 4 },
  { name: "Neuvillette", rarity: 5 },
  { name: "Qiqi", rarity: 5 },
  { name: "Raiden", rarity: 5 },
  { name: "Razor", rarity: 4 },
  { name: "Rosaria", rarity: 4 },
  { name: "Sangonomiya Kokomi", rarity: 5 },
  { name: "Sayu", rarity: 4 },
  { name: "Shenhe", rarity: 5 },
  { name: "Heizou", rarity: 4 },
  { name: "Sucrose", rarity: 4 },
  { name: "Childe", rarity: 5 },
  { name: "Thoma", rarity: 4 },
  { name: "Tighnari", rarity: 5 },
  { name: "Venti", rarity: 5 },
  { name: "Wanderer", rarity: 5 },
  { name: "Wriothesley", rarity: 5 },
  { name: "Xiangling", rarity: 4 },
  { name: "Xiao", rarity: 5 },
  { name: "Xingqiu", rarity: 4 },
  { name: "Xinyan", rarity: 4 },
  { name: "Yae Miko", rarity: 5 },
  { name: "Yanfei", rarity: 4 },
  { name: "Yaoyao", rarity: 4 },
  { name: "Yelan", rarity: 5 },
  { name: "Yoimiya", rarity: 5 },
  { name: "Yun Jin", rarity: 4 },
  { name: "Zhongli", rarity: 5 },
];

const fiveStars = characters.filter(c => c.rarity === 5);
const fourStars = characters.filter(c => c.rarity === 4);

function SortPulls(pulls: Character[]): Character[] {
  return pulls.sort((a, b) => a.rarity - b.rarity);
}

export default function Home() {
  const [pulls, setPulls] = useState<Character[]>([]);
  const [pity, setPity] = useState<number>(0);


  const pullCharacter = (currentPity: number): Character => {
    if (currentPity === 89) {
      const character = fiveStars[Math.floor(Math.random() * fiveStars.length)];
      console.log(`Getting 5 star: ${character.name}`);
      return character;
    }
    const rand = Math.random() * 100;
    if (rand <= 0.6 || currentPity === 88) {
      let character = {} as Character;
      const rateUp = Math.random() * 100;
      if (rateUp >= 55) {
        console.log(rateUp);
        character = fiveStars.find(c => c.name === rateUpCharacter) || fiveStars[Math.floor(Math.random() * fiveStars.length)];
      } else {
        character = fiveStars[Math.floor(Math.random() * fiveStars.length)];
      }
      return character;
    } else {
      const character = fourStars[Math.floor(Math.random() * fourStars.length)];
      console.log(`Getting 4 star: ${character.name}`);
      return character;
    }
  };

  const handlePull = () => {
    const character = pullCharacter(pity);
    setPulls(prev => [character, ...prev]);
    setPity(prev => character.rarity === 5 ? 0 : prev + 1);
  };

  const handleTenPull = () => {
    console.log('Pulling character...');
    const newPulls: Character[] = [];
    let currentPity = pity;
    for (let i = 0; i < 10; i++) {
      const character = pullCharacter(currentPity);
      newPulls.push(character);
      if (character.rarity === 5) {
        currentPity = 0;
      } else {
        currentPity++;
      }
    }
    setPulls(prev => [...SortPulls(newPulls), ...prev]);
    setPity(currentPity);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-purple-900 text-white font-mono py-6">
      <div className="flex justify-center">
        <div className="container shadow-md">
          <div className='mt-6 w-full flex flex-col items-center'>
            <h1 className="text-4xl font-bold mb-8 text-yellow-400 text-center">
              Genshin Impact Gacha Simulator
            </h1>

            <div className="relative w-full sm:w-6/12 h-72 rounded-lg overflow-hidden mb-6">
              <Image
                src="https://static.zerochan.net/Nahida.full.3799078.jpg"
                alt="Genshin Impact Banner"
                fill
                className="object-cover"
                sizes='512'
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 p-4">
                <div className="text-center text-white font-bold text-lg">
                  <div>
                    <span className='text-2xl font-bold text-green-500'>Nahida</span> <span className='text-2xl font-bold text-yellow-400'>★★★★★</span>
                  </div>
                  <div>
                    Rate Up Banner
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center text-gray-300 mb-4">
              Pity: <span className="text-yellow-400 font-bold">{pity}</span> / 90
            </div>

            <div className="flex space-x-4 mb-8">
              <button
                onClick={handlePull}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-full text-white font-bold hover:from-pink-600 hover:to-red-600 transition duration-300 transform hover:scale-105"
              >
                Single Pull
              </button>
              <button
                onClick={handleTenPull}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full text-white font-bold hover:from-purple-600 hover:to-indigo-600 transition duration-300 transform hover:scale-105"
              >
                10x Pull
              </button>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4">
              {pulls.slice(0, 10).map((character, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center p-2 rounded-lg h-34 w-24 ${character.rarity === 5 ? 'bg-gradient-to-r from-yellow-500 to-yellow-700' : 'bg-gradient-to-r from-purple-600 to-indigo-600'} transition duration-300 transform hover:scale-105 animate-fade-in`}
                >
                  <div className="relative w-16 h-16">
                    <Image
                      src={`https://rerollcdn.com/GENSHIN/Characters/1/${character.name}.png`}
                      alt={character.name}
                      fill
                      className="object-cover rounded-full"
                      sizes='128'
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <p className={`mt-2 text-sm font-bold text-center ${character.rarity === 5 ? 'text-yellow-100' : 'text-purple-100'}`}>
                      {character.name}
                    </p>
                    <p className={`text-xs ${character.rarity === 5 ? 'text-yellow-300' : 'text-purple-300'}`}>
                      {character.rarity}★
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              Inventory
            </h2>
            {
              pulls.length === 0 ? (
                <p className="text-center text-gray-300">คุณยังไม่ได้เปิดกาชา</p>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4">
                  {characters.map((char) => {
                    const count = pulls.filter(p => p.name === char.name).length;
                    if (count > 0) {
                      return (
                        <div
                          key={char.name}
                          className={`relative flex flex-col items-center p-2 rounded-lg h-34 w-24 ${char.rarity === 5 ? 'bg-gradient-to-r from-yellow-500 to-yellow-700' : 'bg-gradient-to-r from-purple-600 to-indigo-600'}`}
                        >
                          <div className="relative w-16 h-16">
                            <Image
                              src={`https://rerollcdn.com/GENSHIN/Characters/1/${char.name}.png`}
                              alt={char.name}
                              fill
                              className="object-cover rounded-full"
                              sizes='128'
                            />
                          </div>
                          <div className="flex flex-col items-center">
                            <p className={`mt-2 text-sm font-bold text-center ${char.rarity === 5 ? 'text-yellow-100' : 'text-purple-100'}`}>
                              {char.name}
                            </p>
                            <p className={`text-xs ${char.rarity === 5 ? 'text-yellow-300' : 'text-purple-300'}`}>
                              {char.rarity}★
                            </p>
                          </div>

                          <div className="absolute top-2 right-2 bg-gray-900 rounded-full px-2 py-1 text-xs font-bold text-white">
                            x{count}
                          </div>
                        </div>
                      );
                    } else {
                      return null; // ไม่ต้องแสดงถ้าไม่มีตัวละครนั้น
                    }
                  })}
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}