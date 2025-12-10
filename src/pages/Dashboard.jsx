import React, { useState } from 'react';
import { FaTruck, FaBox, FaMapMarkedAlt, FaClock, FaSearch, FaFilter } from 'react-icons/fa';

const mockDeliveries = [
  { id: 'DLV-01', addr: 'Oyo State,Nigeria.', driver: 'M. Ali', eta: '12:20', status: 'Out for delivery', progress: 75 },
  { id: 'DLV-02', addr: 'Lagos state,Nigeria.', driver: 'S. Benson', eta: '13:10', status: 'In transit', progress: 50 },
  { id: 'DLV-03', addr: 'Osun State,Nigeria', driver: 'O. Okaka', eta: '14:00', status: 'Pending', progress: 10 },
  { id: 'DLV-04', addr: 'Ogun State,Nigeria', driver: 'J. Okoro', eta: '14:00', status: 'Pending', progress: 10 },

];

export default function Dashboard() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = mockDeliveries.filter(d => {
    if (filter === 'all') return true;
    if (filter === 'active') return d.progress > 0 && d.progress < 100;
    if (filter === 'delivered') return d.progress === 100;
    return true;
  }).filter(d => d.id.toLowerCase().includes(query.toLowerCase()) || d.addr.toLowerCase().includes(query.toLowerCase()));

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.titleRow}>
          <div style={styles.logo}>
            <FaTruck />
          </div>
          <div>
            <h1 style={styles.h1}>Delivery Dashboard</h1>
            <div style={styles.h2}>Live dispatch and deliveries overview</div>
          </div>
        </div>

        <div style={styles.headerControls}>
          <div style={styles.searchWrap}>
            <FaSearch style={{ marginLeft: 10, color: '#6b7280' }} />
            <input
              placeholder="Search ID or address"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={styles.search}
            />
            <button onClick={() => setFilter(f => f === 'all' ? 'active' : f === 'active' ? 'delivered' : 'all')} style={styles.filterBtn} aria-label="toggle filter">
              <FaFilter />
              <span style={{ marginLeft: 8, fontSize: 13 }}>{filter}</span>
            </button>
          </div>
        </div>
      </header>

      <section style={styles.statsRow}>
        <div style={styles.statCardPrimary}>
          <div style={styles.statIcon}><FaTruck /></div>
          <div>
            <div style={styles.statLabel}>Active Deliveries</div>
            <div style={styles.statNumber}>{mockDeliveries.filter(d => d.progress > 0 && d.progress < 100).length}</div>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIcon}><FaBox /></div>
          <div>
            <div style={styles.statLabel}>Total Packages</div>
            <div style={styles.statNumber}>{mockDeliveries.length}</div>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIcon}><FaMapMarkedAlt /></div>
          <div>
            <div style={styles.statLabel}>On Map</div>
            <div style={styles.statNumber}>{mockDeliveries.length - 1}</div>
          </div>
        </div>
      </section>

      <main style={styles.mainGrid}>
        <div style={styles.mapCard}>
          <div style={styles.cardHeader}>Live Map</div>
          <div style={styles.mapPlaceholder}>
            <div style={styles.mapText}>Mapbox </div>
          </div>
        </div>

        <aside style={styles.listCard}>
          <div style={styles.cardHeaderRow}>
            <div style={styles.cardHeader}>Deliveries</div>
            <div style={styles.smallMuted}>{filtered.length} results</div>
          </div>

          <ul style={styles.deliveryList}>
            {filtered.map(d => (
              <li key={d.id} style={styles.deliveryItem}>
                <div>
                  <div style={styles.deliveryId}>{d.id} <span style={styles.deliveryEta}>{d.eta}</span></div>
                  <div style={styles.deliveryAddr}>{d.addr}</div>
                  <div style={styles.deliveryMeta}>Driver: {d.driver} • {d.status}</div>
                </div>

                <div style={styles.progressWrap}>
                  <div style={{ ...styles.progressBar, width: `${d.progress}%` }} />
                  <div style={styles.progressText}>{d.progress}%</div>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </main>
    </div>
  );
}

const styles = {
  page: { padding: 20, fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial', background: '#f7fbf9', minHeight: '100vh', boxSizing: 'border-box' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  titleRow: { display: 'flex', alignItems: 'center', gap: 12 },
  logo: { width: 56, height: 56, borderRadius: 12, background: 'linear-gradient(135deg,#0b7a35,#4ec57a)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 },
  h1: { margin: 0, fontSize: 20, color: '#08311d' },
  h2: { marginTop: 2, color: '#4b5563', fontSize: 13 },
  headerControls: { display: 'flex', alignItems: 'center', gap: 12 },
  searchWrap: { display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 10, padding: '6px 8px', boxShadow: '0 4px 12px rgba(2,6,23,0.04)' },
  search: { border: 'none', outline: 'none', padding: '8px 10px', minWidth: 180, fontSize: 14 },
  filterBtn: { marginLeft: 8, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 6, color: '#0b7a35' },

  statsRow: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))', gap: 12, marginBottom: 18 },
  statCard: { background: '#fff', padding: 14, borderRadius: 12, display: 'flex', gap: 12, alignItems: 'center', boxShadow: '0 6px 18px rgba(2,6,23,0.04)' },
  statCardPrimary: { background: 'linear-gradient(90deg,#0b7a35,#2ecc71)', padding: 14, borderRadius: 12, display: 'flex', gap: 12, alignItems: 'center', color: '#fff', boxShadow: '0 8px 26px rgba(11,122,53,0.12)' },
  statIcon: { width: 44, height: 44, borderRadius: 10, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 },
  statLabel: { fontSize: 13, color: '#d1f0d9' },
  statNumber: { fontSize: 18, fontWeight: 700, marginTop: 6, color: '#fff' },

  mainGrid: { display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 14, alignItems: 'start' },
  mapCard: { background: '#fff', padding: 12, borderRadius: 12, boxShadow: '0 6px 18px rgba(2,6,23,0.04)' },
  cardHeader: { fontSize: 15, fontWeight: 700, color: '#08311d', marginBottom: 10 },
  mapPlaceholder: { height: 360, borderRadius: 10, background: 'linear-gradient(180deg,#eefaf1,#f7fbf9)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a89b', border: '1px dashed rgba(11,122,53,0.08)' },
  mapText: { fontSize: 13 },

  listCard: { background: '#fff', padding: 12, borderRadius: 12, boxShadow: '0 6px 18px rgba(2,6,23,0.04)', maxHeight: 520, overflow: 'auto' },
  cardHeaderRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  smallMuted: { color: '#6b7280', fontSize: 13 },
  deliveryList: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 },
  deliveryItem: { padding: 10, borderRadius: 10, background: '#f8fff7', display: 'flex', flexDirection: 'column', gap: 8, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6)' },
  deliveryId: { fontWeight: 700, color: '#08311d' },
  deliveryEta: { marginLeft: 8, fontSize: 12, color: '#6b7280', fontWeight: 500 },
  deliveryAddr: { color: '#376a4a' },
  deliveryMeta: { color: '#4b5563', fontSize: 13 },
  progressWrap: { marginTop: 8, height: 8, background: '#e6f6e9', borderRadius: 8, position: 'relative' },
  progressBar: { position: 'absolute', left: 0, top: 0, bottom: 0, borderRadius: 8, background: 'linear-gradient(90deg,#0b7a35,#2ecc71)' },
  progressText: { marginTop: 6, fontSize: 12, color: '#0b7a35', fontWeight: 600 }
};
