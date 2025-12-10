import { useState, useEffect } from 'react';
import { MapPin, Utensils, Heart, Shuffle, Star, Phone, Navigation } from 'lucide-react';
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
          setError('位置情報の取得に失敗しました。ブラウザの設定を確認してください。');
          setLocation({ lat: 35.6812, lng: 139.7671 });
        }
      );
    }
  }, []);

  const foodCategories = [
    { id: 'random', name: '完全ランダム', icon: '🎲' },
    { id: 'japanese', name: '和食', icon: '🍱' },
    { id: 'chinese', name: '中華', icon: '🥟' },
    { id: 'italian', name: 'イタリアン', icon: '🍝' },
    { id: 'french', name: 'フレンチ', icon: '🥖' },
    { id: 'korean', name: '韓国料理', icon: '🍲' },
    { id: 'cafe', name: 'カフェ', icon: '☕' },
    { id: 'ramen', name: 'ラーメン', icon: '🍜' },
    { id: 'sushi', name: '寿司', icon: '🍣' },
    { id: 'yakiniku', name: '焼肉', icon: '🥩' },
  ];

  const leisureCategories = [
    { id: 'date', name: 'デート', icon: '💑' },
    { id: 'family', name: '家族で遊び', icon: '👨‍👩‍👧‍👦' },
    { id: 'friends', name: '友達と', icon: '👥' },
    { id: 'alone', name: '一人で', icon: '🚶' },
  ];

  const generateSampleResult = () => {
    const foodSamples = [
      { name: '海鮮居酒屋 まぐろ一徹', rating: 4.3, reviews: 328, address: '渋谷区道玄坂2-10-12', phone: '03-1234-5678', type: '居酒屋' },
      { name: 'トラットリア ベラヴィータ', rating: 4.5, reviews: 156, address: '港区赤坂3-5-2', phone: '03-2345-6789', type: 'イタリアン' },
      { name: '中華料理 龍飯店', rating: 4.1, reviews: 442, address: '新宿区新宿3-15-8', phone: '03-3456-7890', type: '中華' },
      { name: 'とんかつ まい泉', rating: 4.4, reviews: 523, address: '千代田区丸の内1-9-1', phone: '03-4567-8901', type: 'とんかつ' },
      { name: 'CAFE MAME-HICO', rating: 4.2, reviews: 287, address: '渋谷区神宮前4-15-3', phone: '03-5678-9012', type: 'カフェ' },
      { name: 'ラーメン二郎 三田本店', rating: 4.0, reviews: 1523, address: '港区三田2-16-4', phone: '03-3456-1234', type: 'ラーメン' },
      { name: '銀座 久兵衛', rating: 4.7, reviews: 892, address: '中央区銀座8-7-6', phone: '03-3571-6523', type: '寿司' },
      { name: '焼肉ジャンボ 白金店', rating: 4.4, reviews: 634, address: '港区白金台3-16-8', phone: '03-3444-5678', type: '焼肉' },
    ];

    const leisureSamples = [
      { name: 'チームラボボーダレス', rating: 4.6, reviews: 8234, address: '江東区青海1-3-8', phone: '03-6368-4292', type: 'デジタルアート' },
      { name: '国立科学博物館', rating: 4.5, reviews: 3421, address: '台東区上野公園7-20', phone: '03-5777-8600', type: '博物館' },
      { name: '葛西臨海水族園', rating: 4.3, reviews: 2156, address: '江戸川区臨海町6-2-3', phone: '03-3869-5152', type: '水族館' },
      { name: '東京スカイツリー', rating: 4.4, reviews: 12543, address: '墨田区押上1-1-2', phone: '0570-55-0634', type: '展望台' },
      { name: '浅草花やしき', rating: 4.1, reviews: 5432, address: '台東区浅草2-28-1', phone: '03-3842-8780', type: '遊園地' },
      { name: 'サンシャイン水族館', rating: 4.2, reviews: 4521, address: '豊島区東池袋3-1', phone: '03-3989-3466', type: '水族館' },
      { name: '東京タワー', rating: 4.3, reviews: 9876, address: '港区芝公園4-2-8', phone: '03-3433-5111', type: '展望台' },
    ];

    if (mode === 'food') {
      return foodSamples[Math.floor(Math.random() * foodSamples.length)];
    } else {
      return leisureSamples[Math.floor(Math.random() * leisureSamples.length)];
    }
  };

  const handleShuffle = () => {
    if (!location) {
      setError('位置情報を取得中です...');
      return;
    }

    setLoading(true);
    setError('');

    setTimeout(() => {
      const sampleResult = generateSampleResult();
      setResult({
        ...sampleResult,
        distance: (Math.random() * 3 + 0.5).toFixed(1),
        openNow: Math.random() > 0.3,
        priceLevel: Math.floor(Math.random() * 4) + 1,
      });
      setLoading(false);
    }, 1500);
  };

  const resetApp = () => {
    setMode('');
    setFoodType('');
    setLeisureType('');
    setResult(null);
    setError('');
  };

  return (
    <>
      <Head>
        <title>どこいこ - 迷ったときのランダム選択</title>
        <meta name="description" content="飲食店や遊び場を迷わずランダムで選べるアプリ" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-md mx-auto p-6">
          <div className="text-center mb-8 pt-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
              <MapPin className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">どこいこ</h1>
            <p className="text-gray-600">迷ったときのランダム選択</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
            {!mode && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-center text-gray-800 mb-6">何を探しますか?</h2>
                <button
                  onClick={() => setMode('food')}
                  className="w-full p-6 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  <Utensils className="mx-auto mb-2" size={40} />
                  <span className="text-xl font-bold">飲食店を探す</span>
                </button>
                <button
                  onClick={() => setMode('leisure')}
                  className="w-full p-6 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  <Heart className="mx-auto mb-2" size={40} />
                  <span className="text-xl font-bold">遊び場を探す</span>
                </button>
              </div>
            )}

            {mode === 'food' && !result && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800">飲食店を選ぶ</h2>
                  <button onClick={resetApp} className="text-sm text-blue-600 hover:underline">
                    最初に戻る
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">料理の種類</label>
                  <div className="grid grid-cols-2 gap-3">
                    {foodCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setFoodType(cat.id)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          foodType === cat.id
                            ? 'border-blue-500 bg-blue-50 shadow-md'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="text-2xl mb-1">{cat.icon}</div>
                        <div className="text-sm font-medium text-gray-700">{cat.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">評価フィルター</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                  >
                    <option value="all">すべて</option>
                    <option value="4.0">★4.0以上</option>
                    <option value="4.5">★4.5以上</option>
                  </select>
                </div>

                <button
                  onClick={handleShuffle}
                  disabled={!foodType || loading}
                  className="w-full p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  <Shuffle size={24} />
                  {loading ? '探しています...' : 'ランダムで選ぶ！'}
                </button>
              </div>
            )}

            {mode === 'leisure' && !result && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800">遊び場を選ぶ</h2>
                  <button onClick={resetApp} className="text-sm text-blue-600 hover:underline">
                    最初に戻る
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">シチュエーション</label>
                  <div className="grid grid-cols-2 gap-3">
                    {leisureCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setLeisureType(cat.id)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          leisureType === cat.id
                            ? 'border-green-500 bg-green-50 shadow-md'
                            : 'border-gray-200 hover:border-green-300'
                        }`}
                      >
                        <div className="text-2xl mb-1">{cat.icon}</div>
                        <div className="text-sm font-medium text-gray-700">{cat.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleShuffle}
                  disabled={!leisureType || loading}
                  className="w-full p-4 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  <Shuffle size={24} />
                  {loading ? '探しています...' : 'ランダムで選ぶ！'}
                </button>
              </div>
            )}

            {result && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800">おすすめはここ！</h2>
                  <button onClick={resetApp} className="text-sm text-blue-600 hover:underline">
                    最初に戻る
                  </button>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 space-y-4">
                  <h3 className="text-2xl font-bold text-gray-800">{result.name}</h3>
                  
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
                      <Star className="text-yellow-500 fill-yellow-500" size={16} />
                      <span className="ml-1 font-bold text-gray-800">{result.rating}</span>
                    </div>
                    <span className="text-sm text-gray-600">({result.reviews}件)</span>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${result.openNow ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {result.openNow ? '営業中' : '営業時間外'}
                    </div>
                  </div>

                  <div className="space-y-2 text-gray-700">
                    <div className="flex items-start gap-2">
                      <MapPin size={18} className="mt-1 flex-shrink-0 text-blue-600" />
                      <div>
                        <div className="font-medium">{result.address}</div>
                        <div className="text-sm text-gray-500">現在地から約{result.distance}km</div>
                      </div>
                    </div>
                    
                    {result.phone && (
                      <div className="flex items-center gap-2">
                        <Phone size={18} className="flex-shrink-0 text-blue-600" />
                        <span>{result.phone}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">種類:</span>
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        {result.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">価格帯:</span>
                      <span className="text-gray-600">{'¥'.repeat(result.priceLevel)}</span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleShuffle}
                      className="flex-1 p-3 bg-white border-2 border-blue-500 text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                    >
                      <Shuffle size={20} />
                      もう一回
                    </button>
                    <button
                      onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(result.name + ' ' + result.address)}`, '_blank')}
                      className="flex-1 p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <Navigation size={20} />
                      地図で見る
                    </button>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}
          </div>

          <div className="text-center space-y-4">
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
              <p className="text-sm font-semibold text-yellow-800 mb-2">📝 デモ版のお知らせ</p>
              <p className="text-xs text-yellow-700">
                これはデモ版です。実際のアプリではGoogle Maps APIを使用して、リアルタイムで周辺の店舗・施設情報を取得します。
              </p>
            </div>
            
            <div className="text-xs text-gray-500">
              <p>© 2024 どこいこ</p>
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
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
    </>
  );
}
