import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const [alex, jordan, sam] = await User.create([
      { username: 'alex.runner', email: 'alex@mergington.edu', name: 'Alex Rivera' },
      { username: 'jordan.walker', email: 'jordan@mergington.edu', name: 'Jordan Lee' },
      { username: 'sam.strong', email: 'sam@mergington.edu', name: 'Sam Patel' },
    ]);

    const [team] = await Team.create([
      {
        name: 'Mergington Movers',
        description: 'A friendly team focused on consistent progress.',
        members: [alex._id, jordan._id, sam._id],
      },
    ]);

    await User.updateMany(
      { _id: { $in: [alex._id, jordan._id, sam._id] } },
      { $set: { team: team._id } },
    );

    await Activity.create([
      { user: alex._id, type: 'running', durationMinutes: 32, distanceMiles: 3.1, points: 42, completedAt: new Date('2026-08-25') },
      { user: jordan._id, type: 'walking', durationMinutes: 45, distanceMiles: 2.4, points: 28, completedAt: new Date('2026-08-26') },
      { user: sam._id, type: 'strength', durationMinutes: 30, points: 35, completedAt: new Date('2026-08-27') },
    ]);

    await Leaderboard.create([
      { user: alex._id, points: 420, rank: 1, period: '2026-08' },
      { user: sam._id, points: 385, rank: 2, period: '2026-08' },
      { user: jordan._id, points: 310, rank: 3, period: '2026-08' },
    ]);

    await Workout.create([
      { title: 'Steady Start', description: 'A comfortable run to build endurance.', type: 'running', difficulty: 'beginner', durationMinutes: 25, target: 'Endurance' },
      { title: 'Power Circuit', description: 'A full-body circuit using bodyweight movements.', type: 'strength', difficulty: 'intermediate', durationMinutes: 30, target: 'Strength' },
      { title: 'Mindful Miles', description: 'An easy-paced walk with short mobility breaks.', type: 'walking', difficulty: 'beginner', durationMinutes: 35, target: 'Recovery' },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
