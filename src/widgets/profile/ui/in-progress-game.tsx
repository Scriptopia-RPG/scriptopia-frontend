import { useRouter } from 'next/navigation';
import { useDeleteGame, useEnterGame } from '@/features/game-manage/api/use-game-manage.mutation';
import { ExistingGameResponse } from '@/features/game-manage/model/types';
import Button from '@/shared/ui/button/button';

interface InProgressGameProps {
  existingGame: ExistingGameResponse | undefined;
  isLoading: boolean;
}

const InProgressGame = ({ existingGame, isLoading }: InProgressGameProps) => {
  const router = useRouter();
  const deleteGameMutation = useDeleteGame();
  const enterGameMutation = useEnterGame();

  const handleDeleteGame = () => {
    if (!existingGame?.sessionId) return;
    if (confirm('정말로 기존 게임을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      deleteGameMutation.mutate(
        { gameId: existingGame.sessionId },
        {
          onSuccess: () => {
            alert('게임이 성공적으로 삭제되었습니다.');
            window.location.reload();
          },
          onError: (error) => {
            alert(error.message || '게임 삭제 중 오류가 발생했습니다.');
          },
        }
      );
    }
  };

  const handleEnterGame = () => {
    if (!existingGame?.sessionId) return;
    enterGameMutation.mutate(existingGame.sessionId, {
      onSuccess: () => router.push(`/play/${existingGame.sessionId}`),
      onError: (error) => {
        alert(error.message || '게임 진입 중 오류가 발생했습니다.');
      },
    });
  };

  const handleCreateNewGame = () => {
    router.push('/play/create');
  };

  if (isLoading) {
    return (
      <section className="rounded-3xl border border-[#2a2a32] bg-[#17171c] p-6 sm:p-8 text-center">
        <p className="text-gray-400">진행중인 게임 정보를 불러오는 중...</p>
      </section>
    );
  }

  if (!existingGame) {
    return (
      <section className="rounded-3xl border border-dashed border-[#35353f] bg-transparent p-6 sm:p-8 text-center">
        <h2 className="text-lg font-semibold text-white">진행 중인 게임이 없습니다.</h2>
        <p className="mt-2 text-sm text-gray-400">새로운 모험을 시작해보세요!</p>
        <Button
          onClick={handleCreateNewGame}
          className="mt-6"
        >
          새 게임 시작하기
        </Button>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-[#2a2a32] bg-[#17171c] p-6 sm:p-8">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">진행 중인 모험</h2>
          <p className="mt-1 text-sm text-gray-400">ID: {existingGame.sessionId}</p>
        </div>
        <div className="flex w-full flex-shrink-0 gap-4 sm:w-auto">
          <Button
            onClick={handleEnterGame}
            disabled={enterGameMutation.isPending}
            className="flex-1"
          >
            {enterGameMutation.isPending ? '진입 중...' : '계속하기'}
          </Button>
          <Button
            onClick={handleDeleteGame}
            disabled={deleteGameMutation.isPending}
            className="flex-1"
            variant="danger"
          >
            {deleteGameMutation.isPending ? '삭제 중...' : '삭제'}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InProgressGame;
