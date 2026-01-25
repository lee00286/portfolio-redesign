import { ModalProvider } from '@/contexts/ModalProvider';
import WindowLayout from '@/components/computer/WindowLayout';
import Details from '@/components/Details';
import ImageModal from '@/components/ImageModal';

export default async function ExperienceDetails({ params }) {
  const { id: experienceId } = await params;

  return (
    <WindowLayout>
      <ModalProvider>
        <div
          className="sm:rounded-b-xl w-full h-[calc(100%-40px)] max-h-[calc(100%-40px)] overflow-hidden"
          style={{ transform: 'translateZ(0)' }}
        >
          <div className="px-4 py-2 w-full h-full overflow-x-hidden overflow-y-scroll">
            <Details
              dbTableName="experiences"
              dbFilters={{
                experience_id: experienceId
              }}
              dataId={experienceId}
            />
          </div>

          <ImageModal />
        </div>
      </ModalProvider>
    </WindowLayout>
  );
}
