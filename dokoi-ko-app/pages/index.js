import { useState, useEffect } from 'react';
import { MapPin, Utensils, Heart, Shuffle, Star, Phone, Navigation, Sparkles, TrendingUp } from 'lucide-react';
import Head from 'next/head';

export default function Home() {
  const [mode, setMode] = useState('');
  const [foodType, setFoodType] = useState('');
  const [rating, setRating] = useState('all');
  const [leisureType, setLeisureType] = useState('');
  const [location, setLocation] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [rouletteItems, setRouletteItems] = useState([]);
  const [currentRouletteIndex, setCurrentRouletteIndex] = useState(0);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          setLocation({ lat: 35.6812, lng: 139.7671 });
        }
      );
    }
  }, []);

  const foodCategories = [
    { id: 'random', name: '完全ランダム', icon: '🎲', gradient: 'from-purple-400 to-pink-500' },
    { id: 'japanese', name: '和食', icon: '🍱', gradient: 'from-red-400 to-orange-500' },
    { id: 'chinese', name: '中華', icon: '🥟', gradient: 'from-yellow-400 to-red-500' },
    { id: 'italian', name: 'イタリアン', icon: '🍝', gradient: 'from-green-400 to-emerald-500' },
    { id: 'french', name: 'フレンチ', icon: '🥖', gradient: 'from-blue-400 to-indigo-500' },
    { id: 'korean', name: '韓国料理', icon: '🍲', gradient: 'from-red-500 to-pink-500' },
    { id: 'cafe', name: 'カフェ', icon: '☕', gradient: 'from-amber-400 to-orange-500' },
    { id: 'ramen', name: 'ラーメン', icon: '🍜', gradient: 'from-orange-400 to-red-500' },
    { id: 'sushi', name: '寿司', icon: '🍣', gradient: 'from-cyan-400 to-blue-500' },
    { id: 'yakiniku', name: '焼肉', icon: '🥩', gradient: 'from-rose-400 to-red-600' },
  ];

  const leisureCategories = [
    { id: 'date', name: 'デート', icon: '💑', gradient: 'from-pink-400 to-rose-500' },
    { id: 'family', name: '家族で遊び', icon: '👨‍👩‍👧‍👦', gradient: 'from-blue-400 to-cyan-500' },
    { id: 'friends', name: '友達と', icon: '👥', gradient: 'from-purple-400 to-indigo-500' },
    { id: 'alone', name: '一人で', icon: '🚶', gradient: 'from-teal-400 to-green-500' },
  ];

  const allSamples = {
    food: [
      { name: '海鮮居酒屋 まぐろ一徹', rating: 4.3, reviews: 328, address: '渋谷区道玄坂2-10-12', phone: '03-1234-5678', type: '居酒屋', emoji: '🍺' },
      { name: 'トラットリア ベラヴィータ', rating: 4.5, reviews: 156, address: '港区赤坂3-5-2', phone: '03-2345-6789', type: 'イタリアン', emoji: '🍝' },
      { name: '中華料理 龍飯店', rating: 4.1, reviews: 442, address: '新宿区新宿3-15-8', phone: '03-3456-7890', type: '中華', emoji: '🥟' },
      { name: 'とんかつ まい泉', rating: 4.4, reviews: 523, address: '千代田区丸の内1-9-1', phone: '03-4567-8901', type: 'とんかつ', emoji: '🐷' },
      { name: 'CAFE MAME-HICO', rating: 4.2, reviews: 287, address: '渋谷区神宮前4-15-3', phone: '03-5678-9012', type: 'カフェ', emoji: '☕' },
      { name: 'ラーメン二郎 三田本店', rating: 4.0, reviews: 1523, address: '港区三田2-16-4', phone: '03-3456-1234', type: 'ラーメン', emoji: '🍜' },
      { name: '銀座 久兵衛', rating: 4.7, reviews: 892, address: '中央区銀座8-7-6', phone: '03-3571-6523', type: '寿司', emoji: '🍣' },
      { name: '焼肉ジャンボ 白金店', rating: 4.4, reviews: 634, address: '港区白金台3-16-8', phone: '03-3444-5678', type: '焼肉', emoji: '🥩' },
    ],
    leisure: [
      { name: 'チームラボボーダレス', rating: 4.6, reviews: 8234, address: '江東区青海1-3-8', phone: '03-6368-4292', type: 'デジタルアート', emoji: '🎨' },
      { name: '国立科学博物館', rating: 4.5, reviews: 3421, address: '台東区上野公園7-20', phone: '03-5777-8600', type: '博物館', emoji: '🦕' },
      { name: '葛西臨海水族園', rating: 4.3, reviews: 2156, address: '江戸川区臨海町6-2-3', phone: '03-3869-5152', type: '水族館', emoji: '🐠' },
      { name: '東京スカイツリー', rating: 4.4, reviews: 12543, address: '墨田区押上1-1-2', phone: '0570-55-0634', type: '展望台', emoji: '🗼' },
      { name: '浅草花やしき', rating: 4.1, reviews: 5432, address: '台東区浅草2-28-1', phone: '03-3842-8780', type: '遊園地', emoji: '🎡' },
      { name: 'サンシャイン水族館', rating: 4.2, reviews: 4521, address: '豊島区東池袋3-1', phone: '03-3989-3466', type: '水族館', emoji: '🐧' },
      { name: '東京タワー', rating: 4.3, reviews: 9876, address: '港区芝公園4-2-8', phone: '03-3433-5111', type: '展望台', emoji: '🗼' },
    ]
  };

  const handleShuffle = () => {
    if (!location) {
      setError('位置情報を取得中です...');
      return;
    }

    setLoading(true);
    setShowResult(false);
    setError('');

    const samples = mode === 'food' ? allSamples.food : allSamples.leisure;
    setRouletteItems(samples);

    let counter = 0;
    const rouletteInterval = setInterval(() => {
      setCurrentRouletteIndex(counter % samples.length);
      counter++;
    }, 100);

    setTimeout(() => {
      clearInterval(rouletteInterval);
      const finalResult = samples[Math.floor(Math.random() * samples.length)];
      setResult({
        ...finalResult,
        distance: (Math.random() * 3 + 0.5).toFixed(1),
        openNow: Math.random() > 0.3,
        priceLevel: Math.floor(Math.random() * 4) + 1,
      });
      setLoading(false);
      setTimeout(() => setShowResult(true), 100);
    }, 2000);
  };

  const resetApp = () => {
    setMode('');
    setFoodType('');
    setLeisureType('');
    setResult(null);
    setShowResult(false);
    setError('');
  };

  return (
    <>
      <Head>
        <title>どこいこ - 迷ったときのランダム選択</title>
        <meta name="description" content="飲食店や遊び場を迷わずランダムで選べるアプリ" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-md mx-auto p-6 relative z-10">
          <div className="text-center mb-8 pt-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full mb-4 shadow-2xl animate-bounce-slow">
              <MapPin className="text-white" size={40} />
            </div>
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-2 animate-fade-in">
              どこいこ
            </h1>
            <p className="text-gray-600 text-lg flex items-center justify-center gap-2">
              <Sparkles size={16} className="text-yellow-500" />
              迷ったときのランダム選択
              <Sparkles size={16} className="text-yellow-500" />
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-6 mb-6 border border-white/20">
            {!mode && (
              <div className="space-y-4 animate-slide-up">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center gap-2">
                  <TrendingUp className="text-blue-500" />
                  何を探しますか?
                </h2>
                <button
                  onClick={() => setMode('food')}
                  className="w-full p-8 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:-rotate-1 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  <Utensils className="mx-auto mb-3 animate-wiggle" size={48} />
                  <span className="text-2xl font-black">飲食店を探す</span>
                  <div className="text-sm mt-2 opacity-90">🍱 🍜 🍕 🍣</div>
                </button>
                <button
                  onClick={() => setMode('leisure')}
                  className="w-full p-8 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:rotate-1 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  <Heart className="mx-auto mb-3 animate-pulse" size={48} />
                  <span className="text-2xl font-black">遊び場を探す</span>
                  <div className="text-sm mt-2 opacity-90">🎡 🎨 🗼 🎪</div>
                </button>
              </div>
            )}

            {mode === 'food' && !result && (
              <div className="space-y-6 animate-slide-up">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <Utensils className="text-orange-500" />
                    飲食店を選ぶ
                  </h2>
                  <button onClick={resetApp} className="text-sm text-blue-600 hover:underline font-semibold">
                    ← 戻る
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <span className="text-2xl">🍽️</span>
                    料理の種類
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {foodCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setFoodType(cat.id)}
                        className={`p-5 rounded-2xl border-3 transition-all duration-300 transform hover:scale-105 ${
                          foodType === cat.id
                            ? `bg-gradient-to-br ${cat.gradient} text-white shadow-xl scale-105 border-transparent`
                            : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-lg'
                        }`}
                      >
                        <div className="text-3xl mb-2 animate-bounce-slow">{cat.icon}</div>
                        <div className={`text-sm font-bold ${foodType === cat.id ? 'text-white' : 'text-gray-700'}`}>
                          {cat.name}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <Star className="text-yellow-500 fill-yellow-500" size={18} />
                    評価フィルター
                  </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none bg-white shadow-sm hover:shadow-md transition-all font-semibold"
                  >
                    <option value="all">すべて</option>
                    <option value="4.0">⭐ 4.0以上</option>
                    <option value="4.5">⭐ 4.5以上</option>
                  </select>
                </div>

                <button
                  onClick={handleShuffle}
                  disabled={!foodType || loading}
                  className="w-full p-6 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 text-white rounded-2xl font-black text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  <Shuffle size={28} className={loading ? 'animate-spin' : ''} />
                  {loading ? 'ルーレット中...' : 'ランダムで選ぶ！'}
                  <Sparkles size={24} />
                </button>
              </div>
            )}

            {mode === 'leisure' && !result && (
              <div className="space-y-6 animate-slide-up">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <Heart className="text-pink-500" />
                    遊び場を選ぶ
                  </h2>
                  <button onClick={resetApp} className="text-sm text-blue-600 hover:underline font-semibold">
                    ← 戻る
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <span className="text-2xl">🎯</span>
                    シチュエーション
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {leisureCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setLeisureType(cat.id)}
                        className={`p-5 rounded-2xl border-3 transition-all duration-300 transform hover:scale-105 ${
                          leisureType === cat.id
                            ? `bg-gradient-to-br ${cat.gradient} text-white shadow-xl scale-105 border-transparent`
                            : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-lg'
                        }`}
                      >
                        <div className="text-3xl mb-2 animate-bounce-slow">{cat.icon}</div>
                        <div className={`text-sm font-bold ${leisureType === cat.id ? 'text-white' : 'text-gray-700'}`}>
                          {cat.name}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleShuffle}
                  disabled={!leisureType || loading}
                  className="w-full p-6 bg-gradient-to-r from-green-500 via-blue-600 to-purple-600 text-white rounded-2xl font-black text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  <Shuffle size={28} className={loading ? 'animate-spin' : ''} />
                  {loading ? 'ルーレット中...' : 'ランダムで選ぶ！'}
                  <Sparkles size={24} />
                </button>
              </div>
            )}

            {loading && rouletteItems.length > 0 && (
              <div className="mt-6 p-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl text-center animate-pulse-slow">
                <div className="text-6xl mb-4 animate-spin-slow">
                  {rouletteItems[currentRouletteIndex]?.emoji}
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-2">
                  {rouletteItems[currentRouletteIndex]?.name}
                </div>
                <div className="text-sm text-gray-600">
                  {rouletteItems[currentRouletteIndex]?.type}
                </div>
              </div>
            )}

            {result && (
              <div className={`space-y-6 ${showResult ? 'animate-pop-in' : 'opacity-0'}`}>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 flex items-center gap-2">
                    <Sparkles className="text-yellow-500" />
                    おすすめはここ！
                  </h2>
                  <button onClick={resetApp} className="text-sm text-blue-600 hover:underline font-semibold">
                    ← 戻る
                  </button>
                </div>

                <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-8 space-y-5 shadow-2xl border-2 border-white">
                  <div className="text-center">
                    <div className="text-7xl mb-4 animate-bounce">{result.emoji}</div>
                    <h3 className="text-3xl font-black text-gray-800 mb-2">{result.name}</h3>
                  </div>
                  
                  <div className="flex items-center justify-center gap-3 flex-wrap">
                    <div className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-2 rounded-full shadow-lg">
                      <Star className="text-white fill-white" size={20} />
                      <span className="ml-2 font-black text-white text-lg">{result.rating}</span>
                    </div>
                    <span className="text-sm text-gray-600 font-semibold">({result.reviews}件)</span>
                    <div className={`px-4 py-2 rounded-full text-sm font-black shadow-lg ${result.openNow ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' : 'bg-gradient-to-r from-red-400 to-pink-500 text-white'}`}>
                      {result.openNow ? '✓ 営業中' : '✗ 営業時間外'}
                    </div>
                  </div>

                  <div className="space-y-3 text-gray-700 bg-white/50 backdrop-blur-sm rounded-2xl p-5">
                    <div className="flex items-start gap-3">
                      <MapPin size={22} className="mt-1 flex-shrink-0 text-blue-600" />
                      <div>
                        <div className="font-bold text-lg">{result.address}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Navigation size={14} />
                          現在地から約{result.distance}km
                        </div>
                      </div>
                    </div>
                    
                    {result.phone && (
                      <div className="flex items-center gap-3">
                        <Phone size={20} className="flex-shrink-0 text-blue-600" />
                        <span className="font-semibold">{result.phone}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-sm font-black">種類:</span>
                      <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                        {result.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm font-black">価格帯:</span>
                      <span className="text-2xl text-green-600 font-bold">{'¥'.repeat(result.priceLevel)}</span>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={handleShuffle}
                      className="flex-1 p-4 bg-white border-3 border-blue-500 text-blue-600 rounded-2xl font-black hover:bg-blue-50 transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Shuffle size={22} />
                      もう一回
                    </button>
                    <button
                      onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(result.name + ' ' + result.address)}`, '_blank')}
                      className="flex-1 p-4 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 text-white rounded-2xl font-black hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                    >
                      <Navigation size={22} />
                      地図で見る
                    </button>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="mt-4 p-5 bg-gradient-to-r from-red-100 to-pink-100 border-2 border-red-300 rounded-2xl text-red-700 text-sm font-semibold animate-shake">
                ⚠️ {error}
              </div>
            )}
          </div>

          <div className="text-center space-y-4">
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300 rounded-2xl p-5 shadow-lg">
              <p className="text-sm font-bold text-yellow-800 mb-2 flex items-center justify-center gap-2">
                <Sparkles size={16} />
                デモ版のお知らせ
                <Sparkles size={16} />
              </p>
              <p className="text-xs text-yellow-700">
                これはデモ版です。実際のアプリではGoogle Maps APIを使用して、リアルタイムで周辺の店舗・施設情報を取得します。
              </p>
            </div>
            
            <div className="text-xs text-gray-500">
              <p className="font-semibold">© 2024 どこいこ</p>
              <p className="mt-1">位置情報は検索のみに使用され、保存されません</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pop-in {
          0% { opacity: 0; transform: scale(0.8); }
          50% { transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-bounce-slow { animation: bounce-slow 2s infinite; }
        .animate-wiggle { animation: wiggle 1s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
        .animate-slide-up { animation: slide-up 0.5s ease-out; }
        .animate-pop-in { animation: pop-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
        .animate-pulse-slow { animation: pulse-slow 2s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 2s linear infinite; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
      `}</style>
    </>
  );
}
