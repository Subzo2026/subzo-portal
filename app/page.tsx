"use client";

import React, { useState } from 'react';
import { 
  Wallet, BookOpen, Key, FileText, ShieldCheck, 
  Copy, CheckCircle, Download, LayoutDashboard, Users, 
  CheckSquare, ArrowUpRight, AlertCircle, RefreshCw, 
  Settings, FileSpreadsheet, Scale, History, UserCheck, 
  ChevronRight, Building2, Store, DollarSign, ShieldAlert,
  Play, Smartphone, Clock, Check
} from 'lucide-react';

export default function SubzoPlatform() {
  const [viewMode, setViewMode] = useState<'admin' | 'partner'>('partner');
  const [adminTab, setAdminTab] = useState('network');
  const [partnerTab, setPartnerTab] = useState('developer');
  const [copiedKey, setCopiedKey] = useState(false);

  // Live Wallet & Order State
  const [walletBalance, setWalletBalance] = useState(176018);
  const [testPhone, setTestPhone] = useState('+919876543210');
  const [selectedSku, setSelectedSku] = useState('sku_sonyliv_12m');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResponse, setSimulationResponse] = useState<any>(null);

  // Simulated Order History
  const [orders, setOrders] = useState([
    { id: "SUBZO-ORD-9912", sku: "SonyLIV Premium (12M)", phone: "+919845012345", amount: 799, status: "SUCCESS", time: "10 mins ago" },
    { id: "SUBZO-ORD-9911", sku: "Zee5 All-Access (12M)", phone: "+919820199482", amount: 449, status: "SUCCESS", time: "42 mins ago" },
  ]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleSimulateActivation = () => {
    if (!testPhone || testPhone.length < 10) return;
    setIsSimulating(true);
    setSimulationResponse(null);

    // Cost mapping
    const cost = selectedSku === 'sku_sonyliv_12m' ? 799 : 449;
    const planName = selectedSku === 'sku_sonyliv_12m' ? 'SonyLIV Premium (12M)' : 'Zee5 All-Access (12M)';

    setTimeout(() => {
      setIsSimulating(false);
      const newOrderId = `SUBZO-ORD-${Math.floor(1000 + Math.random() * 9000)}`;
      const resData = {
        status: 200,
        subzo_order_id: newOrderId,
        msisdn: testPhone,
        sku: selectedSku,
        plan_name: planName,
        provisioning_status: "ACTIVATED",
        upstream_partner: "SUPPLIER_ABC",
        remaining_float: walletBalance - cost,
        timestamp: new Date().toISOString()
      };
      setSimulationResponse(resData);
      setWalletBalance((prev) => prev - cost);
      setOrders((prev) => [
        { id: newOrderId, sku: planName, phone: testPhone, amount: cost, status: "SUCCESS", time: "Just now" },
        ...prev
      ]);
    }, 900);
  };

  const partners = [
    { name: "OneCardIN", gross: "₹176,018", units: 278, status: "LIVE" },
    { name: "VISA MAININ", gross: "₹263", units: 7, status: "LIVE" },
    { name: "CheQIN", gross: "₹0", units: 0, status: "IDLE" },
    { name: "Coupons GuruIN", gross: "₹0", units: 0, status: "IDLE" },
    { name: "PauketIN", gross: "₹0", units: 0, status: "IDLE" },
    { name: "Advantage ClubIN", gross: "₹0", units: 0, status: "IDLE" },
    { name: "Refyne ClubIN", gross: "₹0", units: 0, status: "IDLE" },
    { name: "Swish ClubIN", gross: "₹0", units: 0, status: "IDLE" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Top Bar Switcher */}
      <header className="h-14 border-b border-slate-800 bg-slate-900/90 px-6 flex items-center justify-between sticky top-0 z-50 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-lg text-white">S</div>
          <span className="font-bold text-lg tracking-tight">Subzo<span className="text-blue-500">.</span></span>
          <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-slate-800 text-slate-300 border border-slate-700">
            {viewMode === 'admin' ? 'Internal Ops Engine' : 'Partner Portal'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400">View as:</span>
          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setViewMode('admin')}
              className={`px-3 py-1 text-xs rounded-md font-medium transition ${viewMode === 'admin' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}>
              Internal Subzo (Satish)
            </button>
            <button
              onClick={() => setViewMode('partner')}
              className={`px-3 py-1 text-xs rounded-md font-medium transition ${viewMode === 'partner' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}>
              Partner Portal (OneCard)
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* ========================================================================= */}
        {/* VIEW 1: INTERNAL SUBZO COMMAND CENTER                                     */}
        {/* ========================================================================= */}
        {viewMode === 'admin' && (
          <>
            <aside className="w-64 border-r border-slate-800 bg-slate-950/70 p-4 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-6">
                <div>
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2">Network Control</div>
                  <nav className="space-y-0.5 text-xs font-medium">
                    <button onClick={() => setAdminTab('network')} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition ${adminTab === 'network' ? 'bg-blue-600/15 text-blue-400 font-semibold' : 'text-slate-400 hover:bg-slate-900'}`}>
                      <LayoutDashboard className="w-4 h-4" /> Network Overview
                    </button>
                    <button onClick={() => setAdminTab('approvals')} className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition ${adminTab === 'approvals' ? 'bg-blue-600/15 text-blue-400 font-semibold' : 'text-slate-400 hover:bg-slate-900'}`}>
                      <span className="flex items-center gap-2.5"><CheckSquare className="w-4 h-4" /> Approvals</span>
                      <span className="bg-amber-500/20 text-amber-400 text-[10px] px-1.5 py-0.2 rounded-full font-bold">2</span>
                    </button>
                    <button onClick={() => setAdminTab('partners')} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition ${adminTab === 'partners' ? 'bg-blue-600/15 text-blue-400 font-semibold' : 'text-slate-400 hover:bg-slate-900'}`}>
                      <Users className="w-4 h-4" /> Partners (17)
                    </button>
                    <button onClick={() => setAdminTab('catalogue')} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition ${adminTab === 'catalogue' ? 'bg-blue-600/15 text-blue-400 font-semibold' : 'text-slate-400 hover:bg-slate-900'}`}>
                      <BookOpen className="w-4 h-4" /> Catalogue Moderation
                    </button>
                  </nav>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/40 text-[11px]">
                <div className="flex items-center gap-1.5 text-amber-400 font-semibold mb-1">
                  <ShieldAlert className="w-3.5 h-3.5" /> Four-eyes on
                </div>
                <p className="text-slate-400 leading-snug">Money movement and partner suspensions need a second approver.</p>
                <div className="mt-3 pt-2 border-t border-amber-900/30 text-slate-300 font-medium">Satish (Super Admin)</div>
              </div>
            </aside>

            <main className="flex-1 p-8 overflow-y-auto">
              {adminTab === 'network' && (
                <div className="space-y-6 max-w-6xl">
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight">Network Overview</h1>
                    <p className="text-xs text-slate-400 mt-0.5">Total · 17 partner workspaces · live trading data</p>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Gross · 30d</span>
                      <p className="text-2xl font-black text-white mt-1.5">₹176,359</p>
                    </div>
                    <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Orders</span>
                      <p className="text-2xl font-black text-white mt-1.5">{orders.length + 293}</p>
                    </div>
                    <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Active Partners</span>
                      <p className="text-2xl font-black text-white mt-1.5">17</p>
                    </div>
                    <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Settlements</span>
                      <p className="text-2xl font-black text-white mt-1.5">T+1 Rail</p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
                    <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                      <h3 className="font-semibold text-sm text-white">Partners by Gross Volume</h3>
                    </div>
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-950/60 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                        <tr>
                          <th className="p-3.5">Partner</th>
                          <th className="p-3.5">30d Gross Value</th>
                          <th className="p-3.5">Units</th>
                          <th className="p-3.5">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {partners.map((p, idx) => (
                          <tr key={idx} className="hover:bg-slate-800/30 transition">
                            <td className="p-3.5 font-medium text-white flex items-center gap-2">
                              <Building2 className="w-3.5 h-3.5 text-blue-400" /> {p.name}
                            </td>
                            <td className="p-3.5 font-mono text-slate-200">{p.gross}</td>
                            <td className="p-3.5 font-mono text-slate-400">{p.units}</td>
                            <td className="p-3.5">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${p.status === 'LIVE' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-800 text-slate-400'}`}>
                                {p.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </main>
          </>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: CLIENT / PARTNER VIEW (WITH LIVE API SIMULATOR)                   */}
        {/* ========================================================================= */}
        {viewMode === 'partner' && (
          <>
            <aside className="w-64 border-r border-slate-800 p-6 flex flex-col justify-between">
              <div>
                <nav className="space-y-1 text-sm font-medium">
                  <button onClick={() => setPartnerTab('developer')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${partnerTab === 'developer' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:bg-slate-900'}`}>
                    <Key className="w-4 h-4" /> API & Test Sandbox
                  </button>
                  <button onClick={() => setPartnerTab('wallet')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${partnerTab === 'wallet' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:bg-slate-900'}`}>
                    <Wallet className="w-4 h-4" /> Float & Ledger
                  </button>
                  <button onClick={() => setPartnerTab('catalog')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${partnerTab === 'catalog' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:bg-slate-900'}`}>
                    <BookOpen className="w-4 h-4" /> Subscription Catalog
                  </button>
                  <button onClick={() => setPartnerTab('invoices')} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${partnerTab === 'invoices' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-slate-400 hover:bg-slate-900'}`}>
                    <FileText className="w-4 h-4" /> GST Invoices
                  </button>
                </nav>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-xs text-slate-400">
                <p className="font-medium text-slate-200">OneCard Enterprise Workspace</p>
                <p className="mt-0.5">Live Float: <span className="font-mono text-emerald-400 font-bold">₹{walletBalance.toLocaleString('en-IN')}</span></p>
              </div>
            </aside>

            <main className="flex-1 p-8 overflow-y-auto">
              
              {/* TAB 1: INTERACTIVE DEVELOPER & API SIMULATOR */}
              {partnerTab === 'developer' && (
                <div className="space-y-6 max-w-5xl">
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight">API Sandbox & Provisioning Simulator</h1>
                    <p className="text-xs text-slate-400 mt-0.5">Test real-time phone number activation against the Subzo sandbox gateway.</p>
                  </div>

                  {/* Interactive Test Panel */}
                  <div className="grid grid-cols-2 gap-6">
                    {/* Input Side */}
                    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase font-bold tracking-wider text-blue-400 flex items-center gap-1.5">
                          <Smartphone className="w-4 h-4" /> Provision Request Payload
                        </span>
                        <span className="text-[10px] font-mono bg-blue-950 text-blue-300 border border-blue-800 px-2 py-0.5 rounded">POST /v1/activate</span>
                      </div>

                      <div className="space-y-3 text-xs">
                        <div>
                          <label className="text-slate-400 block mb-1">Target Phone Number (MSISDN)</label>
                          <input 
                            type="text" 
                            value={testPhone} 
                            onChange={(e) => setTestPhone(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-blue-500" 
                            placeholder="+919876543210"
                          />
                        </div>

                        <div>
                          <label className="text-slate-400 block mb-1">Select Subscription SKU</label>
                          <select 
                            value={selectedSku} 
                            onChange={(e) => setSelectedSku(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-blue-500">
                            <option value="sku_sonyliv_12m">SonyLIV Premium (12M) — Cost: ₹799</option>
                            <option value="sku_zee5_12m">Zee5 All-Access (12M) — Cost: ₹449</option>
                          </select>
                        </div>

                        <div className="pt-2">
                          <button 
                            onClick={handleSimulateActivation}
                            disabled={isSimulating}
                            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-900 text-white font-semibold py-2.5 rounded-lg text-xs transition shadow-lg shadow-blue-950">
                            {isSimulating ? (
                              <RefreshCw className="w-4 h-4 animate-spin" />
                            ) : (
                              <Play className="w-4 h-4 fill-white" />
                            )}
                            {isSimulating ? 'Calling Upstream Telco...' : 'Execute Test Activation'}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Output Response Side */}
                    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1.5">
                            <Clock className="w-4 h-4" /> Live Gateway Response
                          </span>
                          {simulationResponse && (
                            <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-bold">200 OK</span>
                          )}
                        </div>

                        <pre className="bg-slate-950 p-4 rounded-xl text-[11px] font-mono text-emerald-400 overflow-x-auto border border-slate-800 h-52">
                          {simulationResponse ? JSON.stringify(simulationResponse, null, 2) : "// Click 'Execute Test Activation' to trigger a mock API call..."}
                        </pre>
                      </div>

                      {simulationResponse && (
                        <div className="mt-3 p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-[11px] text-emerald-300 flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>Float deducted. Transaction added to your live ledger.</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Real-time Order Log */}
                  <div className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden">
                    <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                      <h3 className="font-semibold text-sm text-white">Recent Provisioning Ledger</h3>
                      <span className="text-xs text-slate-400">Updated in real-time</span>
                    </div>
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-950/60 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                        <tr>
                          <th className="p-3.5">Subzo Order ID</th>
                          <th className="p-3.5">Phone Number</th>
                          <th className="p-3.5">Subscription Plan</th>
                          <th className="p-3.5">Deducted Float</th>
                          <th className="p-3.5">Status</th>
                          <th className="p-3.5 text-right">Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-mono">
                        {orders.map((ord, idx) => (
                          <tr key={idx} className="hover:bg-slate-800/30 transition">
                            <td className="p-3.5 font-bold text-blue-400">{ord.id}</td>
                            <td className="p-3.5 text-slate-300">{ord.phone}</td>
                            <td className="p-3.5 font-sans text-white">{ord.sku}</td>
                            <td className="p-3.5 text-rose-400 font-semibold">-₹{ord.amount}</td>
                            <td className="p-3.5 font-sans">
                              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
                                {ord.status}
                              </span>
                            </td>
                            <td className="p-3.5 text-right text-slate-500 font-sans">{ord.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </div>
              )}

              {/* TAB 2: FLOAT & TOP-UP */}
              {partnerTab === 'wallet' && (
                <div className="space-y-6 max-w-5xl">
                  <h1 className="text-2xl font-bold tracking-tight">OneCard Float & Top-Up</h1>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                      <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Available Activation Float</span>
                      <p className="text-3xl font-extrabold text-white mt-2">₹{walletBalance.toLocaleString('en-IN')}.00</p>
                      <div className="flex items-center gap-1.5 mt-3 text-xs text-emerald-400 font-medium">
                        <CheckCircle className="w-3.5 h-3.5" /> Healthy Balance
                      </div>
                    </div>
                    <div className="col-span-2 p-6 rounded-2xl bg-blue-950/20 border border-blue-800/40">
                      <span className="text-xs uppercase tracking-wider text-blue-400 font-semibold">Dedicated Top-Up Virtual Account</span>
                      <div className="grid grid-cols-3 gap-4 mt-3 text-sm font-mono bg-slate-900 p-4 rounded-xl border border-slate-800">
                        <div><span className="text-xs text-slate-500 block">Bank</span>ICICI Corporate</div>
                        <div><span className="text-xs text-slate-500 block">VAN</span>SUBZOONECARD99</div>
                        <div><span className="text-xs text-slate-500 block">IFSC</span>ICIC0000104</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </main>
          </>
        )}
      </div>
    </div>
  );
}