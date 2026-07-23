import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { supabase } from '../lib/supabase';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

export const AdminDashboard: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth');
    if (!auth) {
      navigate('/admin');
      return;
    }

    const fetchData = async () => {
      const { data: responses, error } = await supabase
        .from('SurveyResponses')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && responses) {
        setData(responses);
      } else {
        console.error('Failed to fetch data');
      }
      setLoading(false);
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    navigate('/admin');
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this response?")) return;
    
    const { error } = await supabase
      .from('SurveyResponses')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting:', error.message);
      alert('Failed to delete response. Check database permissions.');
    } else {
      setData(prev => prev.filter(row => row.id !== id));
    }
  };

  // Compute Stats
  const totalResponses = data.length;
  const today = new Date().toISOString().split('T')[0];
  const todayResponses = data.filter(r => r.created_at?.startsWith(today)).length;
  
  const avgAge = totalResponses > 0 
    ? Math.round(data.reduce((sum, r) => sum + (r.age || 0), 0) / totalResponses) 
    : 0;

  const migrationCount = data.filter(r => r.question7 === 'Yes').length;
  const migrationPct = totalResponses > 0 ? Math.round((migrationCount / totalResponses) * 100) : 0;

  const marriedCount = data.filter(r => r.marital_status === 'Married').length;
  const marriedPct = totalResponses > 0 ? Math.round((marriedCount / totalResponses) * 100) : 0;
  const unmarriedPct = totalResponses > 0 ? Math.round(((totalResponses - marriedCount) / totalResponses) * 100) : 0;

  const urbanCount = data.filter(r => r.area_type === 'Urban').length;
  const ruralCount = data.filter(r => r.area_type === 'Rural').length;
  const semiCount = data.filter(r => r.area_type === 'Semi Urban').length;

  const urbanPct = totalResponses > 0 ? Math.round((urbanCount / totalResponses) * 100) : 0;
  const ruralPct = totalResponses > 0 ? Math.round((ruralCount / totalResponses) * 100) : 0;
  const semiPct = totalResponses > 0 ? Math.round((semiCount / totalResponses) * 100) : 0;

  // Chart Data preparation
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  const areaTypeData = [
    { name: 'Urban', value: urbanCount },
    { name: 'Rural', value: ruralCount },
    { name: 'Semi Urban', value: semiCount }
  ];

  const professionMap = data.reduce((acc, r) => {
    acc[r.profession] = (acc[r.profession] || 0) + 1;
    return acc;
  }, {} as any);
  const professionData = Object.keys(professionMap).map(k => ({ name: k, count: professionMap[k] }));

  // Filtering for table
  const filteredData = useMemo(() => {
    return data.filter(row => 
      (row.name && row.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (row.district && row.district.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [data, searchTerm]);

  // Export CSV
  const exportCsv = () => {
    if (filteredData.length === 0) return;
    
    const exportColumns = [
      { key: 'created_at', label: 'Date Submitted' },
      { key: 'name', label: 'Name' },
      { key: 'age', label: 'Age' },
      { key: 'district', label: 'District' },
      { key: 'area_type', label: 'Area Type' },
      { key: 'profession', label: 'Profession' },
      { key: 'profession_other', label: 'Profession (Other)' },
      { key: 'marital_status', label: 'Marital Status' },
      { key: 'marital_other', label: 'Marital Status (Other)' },
      { key: 'question1', label: 'Q1: Reason for migration trend' },
      { key: 'question1_other', label: 'Q1 (Other)' },
      { key: 'question2', label: 'Q2: Kerala govt schemes sufficient?' },
      { key: 'question2_other', label: 'Q2 (Other)' },
      { key: 'question3', label: 'Q3: Financial support needed' },
      { key: 'question4', label: 'Q4: Does climate/economy affect decision?' },
      { key: 'question4_other', label: 'Q4 (Other)' },
      { key: 'question5', label: 'Q5: Personal opinion on issue' },
      { key: 'question6', label: 'Q6: Govt actions requested' },
      { key: 'question7', label: 'Q7: Are you planning to migrate?' }
    ];

    const headers = exportColumns.map(col => `"${col.label}"`).join(',');
    
    const rows = filteredData.map(row => {
      return exportColumns.map(col => {
        let val = row[col.key];
        
        // Handle arrays from multi-select questions
        if (Array.isArray(val)) {
          val = val.join('; ');
        }
        
        // Handle null/undefined
        if (val === null || val === undefined) {
          val = '';
        }
        
        // Escape quotes to prevent CSV breakage
        const stringVal = String(val).replace(/"/g, '""');
        return `"${stringVal}"`;
      }).join(',');
    });

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + headers + "\n" + rows.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "survey_responses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading Dashboard...</div>;

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">{t.dashboard}</h1>
        <button onClick={handleLogout} className="text-gray-500 hover:text-red-500 font-medium">
          {t.logout}
        </button>
      </nav>

      <main className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <StatCard title={t.totalResponses} value={totalResponses} />
          <StatCard title={t.todayResponses} value={todayResponses} />
          <StatCard title={t.avgAge} value={avgAge} />
          <StatCard title={t.migrationPct} value={`${migrationPct}%`} />
          <StatCard title={t.marriedPct} value={`${marriedPct}%`} />
          <StatCard title={t.unmarriedPct} value={`${unmarriedPct}%`} />
          <StatCard title={t.urbanPct} value={`${urbanPct}%`} />
          <StatCard title={t.ruralPct} value={`${ruralPct}%`} />
          <StatCard title={t.semiUrbanPct} value={`${semiPct}%`} />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Area Type Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={areaTypeData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
                    {areaTypeData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Profession Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={professionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{fontSize: 12}} interval={0} angle={-45} textAnchor="end" height={60}/>
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
            <h3 className="text-lg font-semibold">{t.responsesTable}</h3>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <input 
                type="text" 
                placeholder={t.search} 
                className="border border-gray-300 rounded px-3 py-2 sm:py-1 outline-none focus:ring-1 focus:ring-green-500 w-full sm:w-auto"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <button onClick={exportCsv} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 sm:py-1 rounded shadow-sm text-sm font-medium w-full sm:w-auto">
                {t.exportCsv}
              </button>
            </div>
          </div>

          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <table className="min-w-full text-left text-sm text-gray-700">
              <thead className="bg-gray-50 text-gray-600 border-b">
                <tr>
                  <th className="py-3 px-4 font-semibold">Name</th>
                  <th className="py-3 px-4 font-semibold">Age</th>
                  <th className="py-3 px-4 font-semibold">District</th>
                  <th className="py-3 px-4 font-semibold">Area</th>
                  <th className="py-3 px-4 font-semibold">Profession</th>
                  <th className="py-3 px-4 font-semibold">Date</th>
                  <th className="py-3 px-4 font-semibold text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.slice(0, 50).map((row: any, i: number) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{row.name}</td>
                    <td className="py-2 px-4">{row.age}</td>
                    <td className="py-2 px-4">{row.district}</td>
                    <td className="py-2 px-4">{row.area_type}</td>
                    <td className="py-2 px-4">{row.profession}</td>
                    <td className="py-2 px-4">{new Date(row.created_at).toLocaleDateString()}</td>
                    <td className="py-2 px-4 text-center">
                      <button 
                        onClick={() => handleDelete(row.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded transition-colors"
                        title="Delete Response"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-4 px-4 text-center text-gray-500">No data found</td>
                  </tr>
                )}
              </tbody>
            </table>
            {filteredData.length > 50 && <div className="text-center text-xs text-gray-400 mt-2">Showing latest 50 results. Please export for full data.</div>}
          </div>
        </div>

      </main>
    </div>
  );
};

const StatCard = ({ title, value }: { title: string, value: any }) => (
  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col justify-center items-center">
    <h4 className="text-xs text-slate-500 uppercase tracking-wider mb-2 text-center font-medium">{title}</h4>
    <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">{value}</span>
  </div>
);
