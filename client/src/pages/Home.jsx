const Home = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold tracking-tight">Dashboard</span>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-gray-500">Total Balance</p>
          <h2 className="text-3xl font-bold text-green-600">$12,450</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-gray-500">Income</p>
          <h2 className="text-3xl font-bold text-blue-500">$7,200</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-gray-500">Expenses</p>
          <h2 className="text-3xl font-bold text-red-500">$4,750</h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
