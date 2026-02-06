'use client';

import { useEffect, useState } from 'react';

function FormMediaSelector({ label, onSelect, required = false }) {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setIsLoading(true);

    try {
      const payload = {
        // select: '*,logo:images(*)',
        limit: 20
      };

      const res = await fetch(
        '/api/admin/images?' + new URLSearchParams(payload),
        {
          method: 'GET',
          headers: {
            Accept: 'application/json'
          }
        }
      );

      if (!res.ok) {
        throw new Error(res.statusText || 'Image load failed');
      }

      const result = await res.json();

      setImages(result?.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <p className="admin-field-label">
        {label}
        {required && <span className="text-red-500">*</span>}
      </p>
      {/* Media Library */}
      <div className="admin-field-input">
        <div className="editor-row">
          <div className="editor-row-col">
            <div className="grid xlg:grid-cols-10 grid-cols-2 xl:grid-cols-8 md:grid-cols-5 xsm:grid-cols-4 sm:grid-cols-3 gap-3 max-h-[240px] md:max-h-[130px] overflow-y-scroll">
              {isLoading && <p>Loading...</p>}

              {!isLoading &&
                images.map((img) => (
                  <button
                    key={img.id}
                    className="flex justify-center items-center border rounded hover:ring-2 h-16 xsm:h-20 w-full"
                    onClick={() => onSelect?.(img)}
                  >
                    <img
                      src={img.image_url}
                      alt="Preview image"
                      className="rounded object-contain"
                    />
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormMediaSelector;
