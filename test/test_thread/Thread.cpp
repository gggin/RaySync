#include "Thread.h"


Thread::Thread(ThreadFunc func)
    :callback_(func),
     tid_(0),
     isStarted_(false)
{
}

Thread::~Thread()
{
    if(isStarted_)
    {
        pthread_detach(tid_);
    }
}

void Thread::start()
{
    isStarted_ = true;
    pthread_create(&tid_, NULL, callback_, NULL);
}

void Thread::join()
{
    pthread_join(tid_, NULL);
    isStarted_ = false;
}



