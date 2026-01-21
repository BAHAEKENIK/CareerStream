<?php

namespace App\Console\Commands;

use App\Models\Job;
use Illuminate\Console\Command;

class PruneOldJobs extends Command
{
    protected $signature = 'jobs:prune-old {--days=60 : Delete jobs older than N days (by published_at)}';

    protected $description = 'Delete old published jobs to keep the database clean';

    public function handle(): int
    {
        $days = (int) $this->option('days');

        if ($days < 1) {
            $this->error('Days must be >= 1');
            return self::FAILURE;
        }

        $cutoff = now()->subDays($days);

        $deleted = Job::query()
            ->whereNotNull('published_at')
            ->where('published_at', '<', $cutoff)
            ->delete();

        $this->info("Deleted {$deleted} jobs older than {$days} days (published before {$cutoff->toDateTimeString()}).");

        return self::SUCCESS;
    }
}
