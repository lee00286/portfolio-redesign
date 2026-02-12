'use client';

import { useEffect, useMemo, useState } from 'react';
import { useAutosizeTextarea } from '@/hooks/useAutosizeTextarea';

function AboutEdit({ initialData }) {
  const [isSaving, setIsSaving] = useState(false);
  const [baseData, setBaseData] = useState(null);

  // Data Fields
  const [nameEN, setNameEN] = useState('');
  const [nameKO, setNameKO] = useState('');
  const [positionEN, setPositionEN] = useState('');
  const [positionKO, setPositionKO] = useState('');
  const [summaryEN, setSummaryEN] = useState('');
  const [summaryKO, setSummaryKO] = useState('');
  const [detailEN, setDetailEN] = useState('');
  const [detailKO, setDetailKO] = useState('');

  // Autosize textareas
  const summaryENRef = useAutosizeTextarea(summaryEN);
  const summaryKORef = useAutosizeTextarea(summaryKO);
  const detailENRef = useAutosizeTextarea(detailEN);
  const detailKORef = useAutosizeTextarea(detailKO);

  const isUpdated = useMemo(() => {
    return (
      nameEN !== baseData?.name_en ||
      nameKO !== baseData?.name_ko ||
      positionEN !== baseData?.pos_title_en ||
      positionKO !== baseData?.pos_title_ko ||
      summaryEN !== baseData?.summary_en ||
      summaryKO !== baseData?.summary_ko ||
      detailEN !== baseData?.detail_en ||
      detailKO !== baseData?.detail_ko
    );
  }, [
    nameEN,
    nameKO,
    positionEN,
    positionKO,
    summaryEN,
    summaryKO,
    detailEN,
    detailKO
  ]);

  useEffect(() => {
    if (initialData) {
      setBaseData(initialData);
      setNameEN(initialData.name_en ?? '');
      setNameKO(initialData.name_ko ?? '');
      setPositionEN(initialData.pos_title_en ?? '');
      setPositionKO(initialData.pos_title_ko ?? '');
      setSummaryEN(initialData.summary_en ?? '');
      setSummaryKO(initialData.summary_ko ?? '');
      setDetailEN(initialData.detail_en ?? '');
      setDetailKO(initialData.detail_ko ?? '');
    }
  }, [initialData]);

  const onReset = () => {
    setNameEN(baseData?.name_en ?? '');
    setNameKO(baseData?.name_ko ?? '');
    setPositionEN(baseData?.pos_title_en ?? '');
    setPositionKO(baseData?.pos_title_ko ?? '');
    setSummaryEN(baseData?.summary_en ?? '');
    setSummaryKO(baseData?.summary_ko ?? '');
    setDetailEN(baseData?.detail_en ?? '');
    setDetailKO(baseData?.detail_ko ?? '');
  };

  const onSave = async () => {
    if (isSaving) return;

    setIsSaving(true);

    if (!initialData?.id) {
      alert('Invalid data');
      setIsSaving(false);
      return;
    }

    if (!nameEN.trim() || !nameKO.trim()) {
      alert('Name field is required');
      setIsSaving(false);
      return;
    }

    const payload = {
      id: initialData?.id,
      name_en: nameEN,
      name_ko: nameKO,
      pos_title_en: positionEN,
      pos_title_ko: positionKO,
      summary_en: summaryEN,
      summary_ko: summaryKO,
      detail_en: detailEN,
      detail_ko: detailKO
    };

    setBaseData((prev) => ({ ...prev, ...payload }));

    try {
      const res = await fetch('/api/admin/about', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Save failed');
      }

      setBaseData((prev) => ({ ...prev, ...result.data }));

      alert('Saved successfully');
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="editor space-y-4">
      {/* Name */}
      <div className="editor-row">
        <div className="editor-row-col">
          <label htmlFor="name-en" className="admin-field-label">
            Name (EN)
          </label>
          <input
            id="name-en"
            value={nameEN}
            onChange={(e) => setNameEN(e.target.value)}
            className="admin-field-input"
            placeholder="Write name (EN) here..."
          />
        </div>
        <div className="editor-row-col">
          <label htmlFor="name-ko" className="admin-field-label">
            Name (KO)
          </label>
          <input
            id="name-ko"
            value={nameKO}
            onChange={(e) => setNameKO(e.target.value)}
            className="admin-field-input"
            placeholder="Write name (KO) here..."
          />
        </div>
      </div>

      {/* Position Title */}
      <div className="editor-row">
        <div className="editor-row-col">
          <label htmlFor="pos-title-en" className="admin-field-label">
            Position Title (EN)
          </label>
          <input
            id="pos-title-en"
            value={positionEN}
            onChange={(e) => setPositionEN(e.target.value)}
            className="admin-field-input"
            placeholder="Write position title (EN) here..."
          />
        </div>
        <div className="editor-row-col">
          <label htmlFor="pos-title-ko" className="admin-field-label">
            Position Title (KO)
          </label>
          <input
            id="pos-title-ko"
            value={positionKO}
            onChange={(e) => setPositionKO(e.target.value)}
            className="admin-field-input"
            placeholder="Write position title (KO) here..."
          />
        </div>
      </div>

      {/* Summary */}
      <div className="editor-row">
        <div className="editor-row-col">
          <label htmlFor="summary-en" className="admin-field-label">
            Summary (EN)
          </label>
          <textarea
            id="summary-en"
            ref={summaryENRef}
            value={summaryEN}
            onChange={(e) => setSummaryEN(e.target.value)}
            className="admin-field-textarea textarea-autoresize"
            placeholder="Write summary (EN) here..."
          />
        </div>
        <div className="editor-row-col">
          <label htmlFor="summary-ko" className="admin-field-label">
            Summary (KO)
          </label>
          <textarea
            id="summary-ko"
            ref={summaryKORef}
            value={summaryKO}
            onChange={(e) => setSummaryKO(e.target.value)}
            className="admin-field-textarea textarea-autoresize"
            placeholder="Write summary (KO) here..."
          />
        </div>
      </div>

      {/* Detail */}
      <div className="editor-row">
        <div className="editor-row-col">
          <label htmlFor="detail-en" className="admin-field-label">
            Detail (EN)
          </label>
          <textarea
            id="detail-en"
            ref={detailENRef}
            value={detailEN}
            onChange={(e) => setDetailEN(e.target.value)}
            className="admin-field-textarea textarea-autoresize"
            placeholder="Write detail (EN) here..."
          />
        </div>
        <div className="editor-row-col">
          <label htmlFor="detail-ko" className="admin-field-label">
            Detail (KO)
          </label>
          <textarea
            id="detail-ko"
            ref={detailKORef}
            value={detailKO}
            onChange={(e) => setDetailKO(e.target.value)}
            className="admin-field-textarea textarea-autoresize"
            placeholder="Write detail (KO) here..."
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onSave}
          disabled={isSaving || !isUpdated}
          className="btn btn-primary"
        >
          {isSaving ? 'Saving...' : 'Save'}
        </button>

        <button
          onClick={onReset}
          disabled={isSaving}
          className="btn btn-secondary"
          style={{ transition: 'background-color 0.2s ease-in-out' }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default AboutEdit;
